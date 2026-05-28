// ====================================================================
// langkahkecil - Google Apps Script Template
// ====================================================================
// 
// SETUP INSTRUCTIONS:
// 1. Create a new Google Sheet
// 2. Click Extensions → Apps Script
// 3. Delete default code
// 4. Copy-paste ALL code below
// 5. Save & Deploy as Web App (New Deployment)
// 6. Copy deployment URL
// 7. Paste URL in langkahkecil app → Settings → AppScript URL
// 8. Click "Test Connection" to verify
//
// VERSION: 1.0.0
// LAST UPDATED: May 2026
// ====================================================================

// Configuration
const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

// Logging helper
function log(message, data = null) {
  if (data) {
    Logger.log(`[langkahkecil] ${message}:`, JSON.stringify(data));
  } else {
    Logger.log(`[langkahkecil] ${message}`);
  }
}

// ====================================================================
// MAIN HTTP HANDLERS
// ====================================================================

/**
 * Handle GET requests (health check)
 */
function doGet(e) {
  try {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'langkahkecil AppScript is running',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return errorResponse('GET request failed: ' + error.toString());
  }
}

/**
 * Handle POST requests (main API endpoint)
 */
function doPost(e) {
  try {
    // Parse request payload
    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return errorResponse('Invalid JSON: ' + parseError.toString());
    }

    log('Received action', payload.action);

    // Route to appropriate handler
    const action = payload.action;
    switch (action) {
      case 'init':
        return handleInit();
      case 'fetch':
        return handleFetch(payload.collection);
      case 'create':
        return handleCreate(payload.collection, payload.data);
      case 'update':
        return handleUpdate(payload.collection, payload.id, payload.data);
      case 'delete':
        return handleDelete(payload.collection, payload.id);
      case 'sync':
        return handleSync(payload.data);
      default:
        return errorResponse(`Unknown action: ${action}`);
    }
  } catch (error) {
    log('POST Error', error.toString());
    return errorResponse('Internal server error: ' + error.toString());
  }
}

// ====================================================================
// INITIALIZATION
// ====================================================================

/**
 * Initialize spreadsheet with required sheets and headers
 */
function handleInit() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Define sheet schemas
    const schemas = {
      'Tasks': {
        headers: ['id', 'name', 'color', 'order', 'done', 'created_at', 'updated_at', 'user_id'],
        description: 'Daily task list with colors for tagging and priority ordering'
      },
      'Transactions': {
        headers: ['id', 'type', 'amount', 'category', 'note', 'date', 'created_at', 'updated_at', 'user_id'],
        description: 'Income and expense transactions with categories'
      },
      'Weight': {
        headers: ['id', 'weight', 'food_notes', 'date', 'created_at', 'updated_at', 'user_id'],
        description: 'Daily weight logs with optional food diary notes'
      },
      'Categories': {
        headers: ['id', 'name', 'icon', 'user_id'],
        description: 'Transaction categories (income/expense)'
      }
    };

    // Create sheets and headers
    Object.entries(schemas).forEach(([sheetName, config]) => {
      let sheet = ss.getSheetByName(sheetName);
      
      // Create sheet if doesn't exist
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        log(`Created sheet: ${sheetName}`);
      }

      // Set headers if empty
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(config.headers);
        log(`Set headers for ${sheetName}`);
      }
    });

    // Initialize Categories with default values
    const categorySheet = ss.getSheetByName('Categories');
    const categoryLastRow = categorySheet.getLastRow();

    if (categoryLastRow === 1) { // Only headers, no data
      const defaultCategories = [
        ['d1', 'Makanan', '🍜', ''],
        ['d2', 'Transport', '🚗', ''],
        ['d3', 'Belanja', '🛒', ''],
        ['d4', 'Gaji', '💰', ''],
        ['d5', 'Hiburan', '🎭', ''],
        ['d6', 'Utilities', '💡', ''],
        ['d7', 'Kesehatan', '🏥', ''],
        ['d8', 'Pendidikan', '📚', '']
      ];
      categorySheet.getRange(2, 1, defaultCategories.length, 4).setValues(defaultCategories);
      log('Initialized default categories');
    }

    return successResponse('Initialization successful', {
      sheetsCreated: Object.keys(schemas),
      defaultCategoriesLoaded: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    log('Init Error', error.toString());
    return errorResponse('Initialization failed: ' + error.toString());
  }
}

// ====================================================================
// FETCH DATA
// ====================================================================

/**
 * Fetch all records from a collection
 */
function handleFetch(collection) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(collection);

    if (!sheet) {
      return errorResponse(`Sheet '${collection}' not found`);
    }

    // Get all data
    const data = sheet.getDataRange().getValues();

    if (data.length === 0) {
      return successResponse(`Fetched ${collection}`, []);
    }

    // Extract headers and rows
    const headers = data[0];
    const rows = data.slice(1);

    // Convert to objects
    const result = rows
      .filter(row => row[0] !== '') // Skip empty rows
      .map(row => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i];
        });
        return obj;
      });

    log(`Fetched ${collection}`, { count: result.length });
    return successResponse(`Fetched ${collection}`, result);
  } catch (error) {
    log('Fetch Error', error.toString());
    return errorResponse('Fetch failed: ' + error.toString());
  }
}

// ====================================================================
// CREATE DATA
// ====================================================================

/**
 * Create new record in collection
 */
function handleCreate(collection, data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(collection);

    if (!sheet) {
      return errorResponse(`Sheet '${collection}' not found`);
    }

    // Get headers
    const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Build row array based on headers
    const row = headerRow.map(header => {
      return data[header] !== undefined ? data[header] : '';
    });

    // Append row
    sheet.appendRow(row);
    log(`Created record in ${collection}`, { id: data.id });

    return successResponse('Record created', {
      collection: collection,
      id: data.id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    log('Create Error', error.toString());
    return errorResponse('Create failed: ' + error.toString());
  }
}

// ====================================================================
// UPDATE DATA
// ====================================================================

/**
 * Update existing record in collection
 */
function handleUpdate(collection, id, data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(collection);

    if (!sheet) {
      return errorResponse(`Sheet '${collection}' not found`);
    }

    // Get all data
    const range = sheet.getDataRange();
    const values = range.getValues();

    if (values.length === 0) {
      return errorResponse('No data in sheet');
    }

    // Find row with matching id (id is always in column A, index 0)
    const headers = values[0];
    const idColumnIndex = 0;

    let foundRow = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === id) {
        foundRow = i;
        break;
      }
    }

    if (foundRow === -1) {
      return errorResponse(`Record with id '${id}' not found in ${collection}`);
    }

    // Update each field
    let updatedCount = 0;
    headers.forEach((header, columnIndex) => {
      if (data[header] !== undefined) {
        const cellRange = sheet.getRange(foundRow + 1, columnIndex + 1);
        cellRange.setValue(data[header]);
        updatedCount++;
      }
    });

    log(`Updated record in ${collection}`, { id: id, fieldsUpdated: updatedCount });

    return successResponse('Record updated', {
      collection: collection,
      id: id,
      fieldsUpdated: updatedCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    log('Update Error', error.toString());
    return errorResponse('Update failed: ' + error.toString());
  }
}

// ====================================================================
// DELETE DATA
// ====================================================================

/**
 * Delete record from collection
 */
function handleDelete(collection, id) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(collection);

    if (!sheet) {
      return errorResponse(`Sheet '${collection}' not found`);
    }

    // Get all data
    const range = sheet.getDataRange();
    const values = range.getValues();

    if (values.length === 0) {
      return errorResponse('No data in sheet');
    }

    // Find row with matching id
    const idColumnIndex = 0; // id is always first column

    let foundRow = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === id) {
        foundRow = i;
        break;
      }
    }

    if (foundRow === -1) {
      return errorResponse(`Record with id '${id}' not found`);
    }

    // Delete row (need to add 1 because sheet indexing is 1-based)
    sheet.deleteRow(foundRow + 1);
    log(`Deleted record from ${collection}`, { id: id });

    return successResponse('Record deleted', {
      collection: collection,
      id: id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    log('Delete Error', error.toString());
    return errorResponse('Delete failed: ' + error.toString());
  }
}

// ====================================================================
// BATCH SYNC
// ====================================================================

/**
 * Handle batch sync operations
 * Expects array of operations: [{action, collection, id?, data?}]
 */
function handleSync(records) {
  try {
    if (!Array.isArray(records)) {
      return errorResponse('Sync data must be an array');
    }

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    records.forEach((record, index) => {
      try {
        switch (record.action) {
          case 'create':
            handleCreate(record.collection, record.data);
            successCount++;
            break;
          case 'update':
            handleUpdate(record.collection, record.id, record.data);
            successCount++;
            break;
          case 'delete':
            handleDelete(record.collection, record.id);
            successCount++;
            break;
          default:
            throw new Error(`Unknown action: ${record.action}`);
        }
      } catch (error) {
        errorCount++;
        errors.push({
          index: index,
          action: record.action,
          error: error.toString()
        });
        log(`Sync error at index ${index}`, error.toString());
      }
    });

    log('Batch sync completed', { successCount, errorCount });

    return successResponse('Sync completed', {
      totalRequests: records.length,
      successCount: successCount,
      errorCount: errorCount,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    log('Sync Error', error.toString());
    return errorResponse('Sync failed: ' + error.toString());
  }
}

// ====================================================================
// RESPONSE HELPERS
// ====================================================================

/**
 * Success response
 */
function successResponse(message, data = null) {
  const response = {
    success: true,
    message: message,
    timestamp: new Date().toISOString()
  };

  if (data) {
    response.data = data;
  }

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Error response
 */
function errorResponse(message, details = null) {
  const response = {
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  };

  if (details) {
    response.details = details;
  }

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// ====================================================================
// UTILITY FUNCTIONS
// ====================================================================

/**
 * Get sheet info (for debugging)
 */
function getSheetInfo() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheets = ss.getSheets();
  
  const info = sheets.map(sheet => ({
    name: sheet.getName(),
    rows: sheet.getLastRow(),
    columns: sheet.getLastColumn()
  }));

  return ContentService
    .createTextOutput(JSON.stringify(info, null, 2))
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Clear all data (WARNING: This will delete all data!)
 * Use only for testing/reset
 */
function resetAllData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetNames = ['Tasks', 'Transactions', 'Weight', 'Categories'];

  sheetNames.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      // Keep headers, delete data rows
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
    }
  });

  log('Reset all data');
  return 'Reset complete';
}

// ====================================================================
// DEPLOYMENT NOTES
// ====================================================================

/*
BEFORE DEPLOYING:

1. Check that all functions are defined
2. Review error handling
3. Test locally in Apps Script editor

DEPLOYMENT STEPS:

1. Click "Deploy" button (top right)
2. Select "New deployment"
3. Choose type: "Web app"
4. Settings:
   - Execute as: [Your Google Account]
   - Who has access: "Anyone"
5. Click "Deploy"
6. Copy the deployment URL
7. Paste URL in langkahkecil app Settings

TESTING:

Use curl or Postman to test:

GET request:
  curl "https://script.google.com/macros/s/[DEPLOYMENT_ID]/usercontent"

POST request (fetch all tasks):
  curl -X POST "https://script.google.com/macros/s/[DEPLOYMENT_ID]/usercontent" \
    -H "Content-Type: application/json" \
    -d '{"action":"fetch","collection":"Tasks"}'

POST request (initialize):
  curl -X POST "https://script.google.com/macros/s/[DEPLOYMENT_ID]/usercontent" \
    -H "Content-Type: application/json" \
    -d '{"action":"init"}'

TROUBLESHOOTING:

- Check Apps Script editor logs: Click "Executions" tab
- Verify sheet names match exactly: Tasks, Transactions, Weight, Categories
- Ensure columns are in correct order per schema
- Check deployment is set to "New deployment" not "Development"
- Verify "Execute as" is set to your account
- Verify "Who has access" is set to "Anyone"

*/

// ====================================================================
// END OF CODE
// ====================================================================
