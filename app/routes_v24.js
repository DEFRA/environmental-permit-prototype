var express = require('express')
var router = express.Router()

const request = require('request')
const async = require('async')

// this file deals with all paths starting /version_x
// How to use folder variable:
// res.redirect( '/' + folder + '/exemptions/add_exemptions');

var folder = "v24"
var servicename = "Apply for an environmental permit"
var paymentMethod = "govpay"  // or "govpay"

var sample = require('./views/'+folder+'/custom_inc/sample-permit.js')
//console.log(sample.permit)

// HTML for standard buttons
var backlink = '<a href="javascript:history.back()" class="govuk-back-link">Back</a>'
var submitButton = '<button type="submit" id="continueButton" class="govuk-button" name="Continue">Continue</button>'
//var completeLink = '<a id="completeLink" href="/'+folder+'/save-and-return/check">Continue later</a>'
var completeLink = ''

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

router.use(function (req, res, next) {
  // set a folder and store in locals
  // this can then be used in pages as {{folder}}
  res.locals.folder=folder
  res.locals.backlink=backlink
  res.locals.submitButton=submitButton
  res.locals.completeLink=completeLink
  res.locals.paymentMethod=paymentMethod
  res.locals.serviceName=servicename
  // permit and autostore data set in all statement at bottom
  res.locals.permit=res.locals.data

  next()
});

// CLEAR SESSION ==============================================================
router.get('/cls', function (req, res) {
  req.session.destroy()
  res.render('index')
})


// Start or resume ==============================================================

router.get('/start/start-or-resume', function (req, res) {
  res.render(folder + '/start/start-or-resume',{
      "formAction":"/"+ folder + "/save-and-return/save-choice"
  })
})

router.post('/start/start-or-resume', function (req, res) {
  res.render(folder + '/start/start-or-resume',{
      "formAction":"/"+ folder + "/save-and-return/save-choice"
  })
})

// Send permit data in session to every page ==================================
router.all('*', function (req, res, next) {
  res.locals.permit=res.locals.data
  next()
})

// Route to check if application has started and redirect
router.post('/save-and-return/save-choice', function (req, res) {
  if (req.body['started-application']=="no") {
    res.redirect("/"+ folder + "/selectpermit/bespoke-or-standard")
  } else {
    res.redirect("/"+ folder + "/save-and-return/already-started")
  }
})

// Check category is in-scope ============================

// required for 'select a different permit' via start page or task list
router.post('/selectpermit/bespoke-or-standard', function (req, res) {
  res.render(folder + '/selectpermit/bespoke-or-standard',{
    "formAction":"/"+ folder + "/start/start-or-resume"
    // "chosenPermitID":req.body['chosenPermitID']
  })
})

router.get('/selectpermit/bespoke-or-standard', function (req, res) {
  res.render(folder + '/selectpermit/bespoke-or-standard',{
    "formAction":"/"+ folder + "/start/start-or-resume"
    // "chosenPermitID":req.body['chosenPermitID']
  })
})

// required for 'select an activity for bespoke' via start page or task list
router.post('/selectpermit/select-bespoke-or-standard', function (req, res) {
if(req.body['bespokePermit']=="standard"){ // think you need square bracket for radios
    res.render(folder + '/selectpermit/permit-category2',{
      "formAction":"/"+ folder + "/selectpermit/choose-permit2",
      "chosenPermitID":req.body['chosenPermitID']
    })
} else if(req.body['bespokePermit']=="bespoke-other") {
    res.render(folder + '/selectpermit/bespoke-offline')
} else {
    res.render(folder + '/bespoke/v2-activities/bespoke-category',{
        "formAction":"/"+ folder + "/bespoke/v2-activities/bespoke-choose-activity"
    })
}
})



router.post('/selectpermit/check-category', function (req, res) {
switch (req.body['chosenCategory']) {
  // These categories are NOT online
  case 'Flood risk activities':
  case 'Radioactive substances for non-nuclear sites':
  case 'Water discharges':
    // go on to 'paper' form page'
    return res.render(folder + '/selectpermit/permit-not-in-service',{})
}

switch (req.body['operatorType']) {
  case 'Limited company':
  case 'Sole trader':
  case 'Limited liability partnership':
  case 'Individual':
    // go on to choose permit
    return res.render(folder + '/selectpermit/choose-permit2',{
      "formAction":"/"+ folder + "/check/save-permit-details",
      "chosenCategory":req.body['chosenCategory']
    })
}

res.render(folder + '/selectpermit/permit-not-in-service',{})
})


router.get('/save-and-return/check', function (req, res) {
  if( req.session.data['saveReturnEmail']==null ){ // not created save link yet
      res.render(folder + '/save-and-return/email-or-phone',{
        "formAction":"/"+ folder + "/save-and-return/confirm"
      })
  } else {
      res.render(folder + '/save-and-return/complete-later',{
      })
  }
})


// set up dummy data
  router.get('/mcp', function (req, res) {
  req.session.data = { permitoperation: 'mcp' }
  res.redirect(`/${folder}/start/start-or-resume`)
})

// set up dummy data
router.get('/mcp-standard-rules', function (req, res) {
  req.session.data = { permitoperation: 'mcp-standard' }
  res.redirect(`/${folder}/start/start-or-resume`)
})

// set up dummy data
router.get('/mcp-standard', function (req, res) {
  req.session.data = { permitoperation: 'mcp-standard' }
  res.redirect(`/${folder}/mcp-guidance/guide1`)
})

 // Pre-app to get pre app ====================================================================

router.get('/bespoke/pre-app/pre-app', function (req, res) {
  res.render(folder + '/bespoke/pre-app/pre-app',{
    "formAction":"/"+ folder + "/bespoke/pre-app/pre-app-check"
  })
})

router.post('/bespoke/pre-app/pre-app', function (req, res) {
  res.render(folder + '/bespoke/pre-app/pre-app',{
    "formAction":"/"+ folder + "/bespoke/pre-app/pre-app-check"
  })
})


// Deal with what to show next
router.post('/bespoke/pre-app/pre-app-check', function (req, res) {
  var preAppYesNo = req.body.preAppYesNo

  if (preAppYesNo === 'no') {
    res.redirect("/"+ folder + "/bespoke/activities-assessments/bespoke-type")
  } else {
    res.redirect("/"+ folder + "/bespoke/pre-app/get-pre-app")
  }
})

// permit holder screen KEEP
router.post('/operator/site-operator', function (req, res) {
  res.render(folder + '/operator/site-operator',{
      "formAction":"/"+ folder + "/operator/sole-trader/sole-trader"
  })
})

 router.get('/operator/site-operator', function (req, res) {
   res.render(folder + '/operator/site-operator',{
       "formAction":"/"+ folder + "/operator/checkoperator"
   })
 })

// After operator, route depends on permit type KEEP
router.post('/after-operator-choice', function (req, res) {
  if (req.session.data.permitoperation=="mcp") { // MCP
    res.redirect("/"+ folder + "/operator/sole-trader/sole-trader")
  } else if( req.session.data['bespokePermit']=='standard' ) {// standard rule
    res.redirect("/"+ folder + "/selectpermit/permit-category2")

  } else { // standard rule
  res.redirect("/"+ folder + "/operator/sole-trader/sole-trader") // Bespoke not MCP
  }
})



router.post('/save-and-return/confirm', function (req, res) {
  res.render(folder + '/save-and-return/confirm',{
    "formAction":"/"+ folder + "/save-and-return/sent"
  })
})

router.post('/save-and-return/sent', function (req, res) {
  // IF EMAIL WAS RECEIVED GO TO TASK LIST
  if(req.body.GOTEMAIL == "YES"){
    res.render(folder + '/check/task-list',{
        "formAction":"/"+ folder + "/check/check-answers"
    })
  // EMAIL NOT RECEIVED SHOW PAGE AGAIN
  } else {
    res.render(folder + '/save-and-return/sent',{
        "formAction":"/"+ folder + "/save-and-return/sent_again",
        "resent":"resent"  // use this to change the heading
    })
  }
})

router.post('/save-and-return/sent_again', function (req, res) {
  // IF EMAIL WAS RECEIVED GO TO TASK LIST
  if(req.body.GOTEMAIL == "YES"){
    res.render(folder + '/check/task-list',{
        "formAction":"/"+ folder + "/check/check-answers"
    })
  // EMAIL NOT RECEIVED SHOW PAGE AGAIN
  } else {
    res.render(folder + '/save-and-return/sent_again',{
        "formAction":"/"+ folder + "/save-and-return/sent_again",
        "resent":"resent"  // use this to change the heading
    })
  }
})

router.post('/save-and-return/email-or-phone', function (req, res) {
  // IF EMAIL WAS RECEIVED GO TO TASK LIST
  if(req.body.GOTEMAIL == "YES"){
    res.render(folder + '/check/task-list',{
        "formAction":"/"+ folder + "/check/check-answers"
    })
  // EMAIL NOT RECEIVED SHOW PAGE AGAIN
  } else {
    res.render(folder + '/save-and-return/email-or-phone',{
        "formAction":"/"+ folder + "/save-and-return/email-or-phone",
        "resent":"resent"  // use this to change the heading
    })
  }
})

router.get('save-and-return/email-save-link', function (req, res) {
  res.render(folder + 'save-and-return/email-save-link',{
  })
})


// This is not a real page, just a URL for the route
router.get('/save-and-return/check', function (req, res) {
  if( req.session.data['saveReturnEmail']==null ){ // not created save link yet
      res.render(folder + '/save-and-return/email-or-phone',{
        "formAction":"/"+ folder + "/save-and-return/confirm"
      })
  } else {
      res.render(folder + '/save-and-return/complete-later',{
      })
  }
})

// Bespoke type ==============================================================
router.get('/bespoke/activities-assessments/bespoke-type', function (req, res) {
  res.render(folder + '/bespoke/activities-assessments/bespoke-type',{
    "formAction":"/"+ folder + "/bespoke-check"
  })
})

// Bespoke Check - not real page =============================================
router.post('/bespoke-check', function (req, res) {
  var facilityType = req.body.facilityType
  if (facilityType === "Waste treatment") {
    res.redirect("/"+ folder + "/bespoke/activities-assessments/bespoke-choose-activity-radio")

  } else if (facilityType === 'mcp and sg') {
    // redirect to the relevant page
  res.redirect("/"+ folder + '/bespoke/activities-assessments/permit-select-mcp-sg')

  } else {
    res.redirect("/"+ folder + "/bespoke/offline/bespoke-selection-offline")
  }
})

// 500 hours ============
router.get('/selectpermit/500-hours', function (req, res) {
  res.render(folder + '/selectpermit/500-hours',{
    "formAction":"/"+ folder + "/selectpermit/500-hours-check"
  })
})

router.post('/selectpermit/500-hours', function (req, res) {
  res.render(folder + '/selectpermit/500-hours',{
    "formAction":"/"+ folder + "/selectpermit/500-hours-check"
  })
})

// Deal with what to show next
router.post('/selectpermit/500-hours-check', function (req, res) {
  var hours = req.body.hours

  if (hours === 'yes') {
    res.redirect("/"+ folder + "/bespoke/activities-assessments/confirm-mcp-costs")
  } else {
    res.redirect("/"+ folder + "/bespoke/activities-assessments/dispersion-modelling")
  }
})


// EPR PERMIT ============
router.get('/selectpermit/other-permits', function (req, res) {
  res.render(folder + '/selectpermit/other-permits',{
    "formAction":"/"+ folder + "/selectpermit/other-permits-check"
  })
})

router.post('/selectpermit/other-permits', function (req, res) {
  res.render(folder + '/selectpermit/other-permits',{
    "formAction":"/"+ folder + "/selectpermit/other-permits-check"
  })
})

// Deal with what to show next
router.post('/selectpermit/other-permits-check', function (req, res) {
  var eprPermit = req.body.eprPermit

  if (eprPermit === 'no') {
    if (req.session.data.generatorType==="mobile sg") {
      res.redirect("/"+ folder + "/bespoke/activities-assessments/confirm-mcp-costs")
    } else if (req.session.data.generatorType==="smcp also sg"){
      res.redirect("/"+ folder + "/selectpermit/500-hours")
    } else if (req.session.data.generatorType==="smcp"){
      res.redirect("/"+ folder + "/selectpermit/500-hours")
    } else if (req.session.data.generatorType==="ssg"){
      res.redirect("/"+ folder + "/bespoke/activities-assessments/dispersion-modelling")
    } else if (req.session.data.generatorType==="mobile mcp"){
      res.redirect("/"+ folder + "/bespoke/activities-assessments/energy-efficiency-report")
    } else {
      res.redirect("/"+ folder + "/check/task-list")
    }
  } else {
    res.redirect("/"+ folder + "/selectpermit/epr-permit-holder")
  }
})

// AIR DISPERSION MODELLING ROUTES ============
router.get('/bespoke/activities-assessments/dispersion-modelling', function (req, res) {
  res.render(folder + '/bespoke/activities-assessments/dispersion-modelling',{
    "formAction":"/"+ folder + "/bespoke/activities-assessments/dispersion-modelling-check"
  })
})

router.post('/bespoke/activities-assessments/dispersion-modelling', function (req, res) {
  res.render(folder + '/bespoke/activities-assessments/dispersion-modelling',{
    "formAction":"/"+ folder + "/bespoke/activities-assessments/dispersion-modelling-check"
  })
})

// Deal with what to show next
router.post('/bespoke/activities-assessments/dispersion-modelling-check', function (req, res) {

    if (req.session.data.generatorType==="smcp also sg"){
      res.redirect("/"+ folder + "/bespoke/activities-assessments/energy-efficiency-report")
    } else if (req.session.data.generatorType==="smcp"){
      res.redirect("/"+ folder + "/bespoke/activities-assessments/energy-efficiency-report")
    } else if (req.session.data.generatorType==="ssg"){
      res.redirect("/"+ folder + "/selectpermit/20-50mw")
    }
})

// 20-50mw ============
router.get('/selectpermit/20-50mw', function (req, res) {
  res.render(folder + '/selectpermit/20-50mw',{
  "formAction":"/"+ folder + "/selectpermit/20-50mw-check"
})
})

router.post('/selectpermit/20-50mw', function (req, res) {
res.render(folder + '/selectpermit/20-50mw',{
  "formAction":"/"+ folder + "/selectpermit/20-50mw-check"
})
})

// Deal with what to show next
router.post('/selectpermit/20-50mw-check', function (req, res) {
  if (req.session.data.generatorType==="ssg" || req.session.data.energysource==="boiler-furnace-gas"){
    res.redirect("/"+ folder + "/bespoke/activities-assessments/habitat-assessment")
  } else if (req.session.data.generatorType==="smcp also sg"){
    res.redirect("/"+ folder + "/selectpermit/burning-biomass")
  }
})

// ENERGY EFFICIENCY REPORT ROUTES ============
router.get('/bespoke/activities-assessments/energy-efficiency-report', function (req, res) {
    res.render(folder + '/bespoke/activities-assessments/energy-efficiency-report',{
    "formAction":"/"+ folder + "/bespoke/activities-assessments/energy-efficiency-report-check"
  })
})

router.post('/bespoke/activities-assessments/energy-efficiency-report', function (req, res) {
  res.render(folder + '/bespoke/activities-assessments/energy-efficiency-report',{
    "formAction":"/"+ folder + "/bespoke/activities-assessments/energy-efficiency-report-check"
  })
})

// Deal with what to show next
router.post('/bespoke/activities-assessments/energy-efficiency-report-check', function (req, res) {
    if (req.session.data.generatorType==="smcp also sg"){
      res.redirect("/"+ folder + "/selectpermit/20-50mw")
    } else if (req.session.data.generatorType==="smcp"){
      res.redirect("/"+ folder + "/selectpermit/burning-biomass")
    } else if (req.session.data.generatorType==="mobile mcp"){
      res.redirect("/"+ folder + "/bespoke/activities-assessments/confirm-mcp-costs")
    }
})


// Activity Check - not real page =============================================
router.post('/activity-check', function (req, res) {
  // If set, add activity to the list in chosenPermitID
  var {activityID,chosenPermitID = []} = req.session.data
  if (activityID){
    chosenPermitID.push(activityID)
    delete req.session.data.activityID
    req.session.data.chosenPermitID = chosenPermitID
    var showAddConfirmPage="Yes"
    res.locals.data.chosenPermitID = chosenPermitID
  }

  if(req.body.addActivity=="Yes"){
    res.redirect("/"+ folder + "/bespoke/activities-assessments/bespoke-choose-activity-radio")
  } else if(req.body.addActivity=="_unchecked") {
    res.redirect("/"+ folder + "/name-check")
  } else {
    res.redirect("/"+ folder + "/bespoke/activities-assessments/add-confirm-radio")
  }
})


// Add and confirm
router.post('/bespoke/activities-assessments/add-confirm-radio', function (req, res) {
  res.render(folder + '/bespoke/activities-assessments/add-confirm-radio',{})
})

// Delete
router.get('/bespoke/activities-assessments/add-confirm-radio', function (req, res) {
    var activityIDtoDelete = req.query.del
    for( var i = 0; i < req.session.data.chosenPermitID.length-1; i++){
       if ( req.session.data.chosenPermitID[i] === activityIDtoDelete) {
         req.session.data.chosenPermitID.splice(i, 1);
       }
    }
    res.render(folder + '/bespoke/activities-assessments/add-confirm-radio',{
      "formAction":"/"+ folder + "/bespoke/activities-assessments/add-confirm-radio"
    })
})

// function to use to check dupes
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

// Name activity check - not real page =============================================
router.all('/name-check', function (req, res) {
 if (hasDuplicates(req.session.data.chosenPermitID)) {
   // find duplicate ID
   var input = req.session.data.chosenPermitID
   // from stack overflow
   // https://bit.ly/2Ec3VXf
   var duplicates = input.reduce(function(acc, el, i, arr) {
     if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
   }, []);
  req.session.data = { ...req.session.data, ...{ add: [duplicates] } } // add back into data object to use on name page

   res.redirect("/"+ folder + "/bespoke/activities-assessments/name-activities")
 } else {
   res.redirect("/"+ folder + "/bespoke/assessments/your-assessments")
 }
})

// Names, if needed
router.post('/bespoke/activities-assessments/name-activities', function (req, res) {
   res.render(folder + '/bespoke/activities-assessments/name-activities',{
     "formAction":"/"+ folder + "/bespoke/assessments/your-assessments"
   })
})

// Select activity page
router.post('/bespoke/activities-assessments/bespoke-choose-activity', function (req, res) {
  res.render(folder + '/bespoke/activities-assessments/bespoke-choose-activity',{
    "formAction":"/"+ folder + "/bespoke/assessments/your-assessments"
  })
})
router.get('/bespoke/activities-assessments/bespoke-choose-activity', function (req, res) {
  res.render(folder + '/bespoke/activities-assessments/bespoke-choose-activity',{
    "formAction":"/"+ folder + "/bespoke/assessments/your-assessments"
  })
})

// Select type - GET
router.get('/bespoke/activities-assessments/bespoke-category', function (req, res) {
    res.render(folder + '/bespoke/activities-assessments/bespoke-category',{
      "formAction":"/"+ folder + "/bespoke/activities-assessments/bespoke-choose-activity"
    })
})

// Select type POST version
router.post('/bespoke/activities-assessments/bespoke-category', function (req, res) {
    res.render(folder + '/bespoke/activities-assessments/bespoke-category',{
      "formAction":"/"+ folder + "/bespoke/activities-assessments/bespoke-choose-activity"
    })
})

// Materials
router.post('/bespoke/check-assessments/materials-you-produce', function (req, res) {
  res.render(folder + '/bespoke/check-assessments/materials-you-produce',{
    "formAction":"/"+ folder + "/bespoke/assessments/your-assessments"
  })
})

// Your assessments
router.post('/bespoke/assessments/your-assessments', function (req, res) {
  res.render(folder + '/bespoke/assessments/your-assessments',{
    "formAction":"/"+ folder + "/bespoke/activities-assessments/confirm"
  })
})

router.get('/bespoke/assessments/your-assessments', function (req, res) {
  res.render(folder + '/bespoke/assessments/your-assessments',{
    "formAction":"/"+ folder + "/bespoke/activities-assessments/confirm"
  })
})

// Confirm assessments
router.post('/bespoke/activities-assessments/confirm', function (req, res) {
  res.render(folder + '/bespoke/activities-assessments/confirm',{
    "formAction":"/"+ folder + "/check/task-list"
  })
})

router.post('/save-and-return/confirm', function (req, res) {
  res.render(folder + '/save-and-return/confirm',{
    "formAction":"/"+ folder + "/save-and-return/sent"
  })
})


// Contact ===================================================================

router.get('/contact/contact-details', function (req, res) {
  res.render(folder + '/contact/contact-details',{
      "formAction":"/"+ folder + "/site/site-contact"
  })
})

router.post('/site/site-contact', function (req, res) {
  res.render(folder + '/site/site-contact',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

// Claim confidentiality ========================================================

router.get('/check/claim-confidentiality', function (req, res) {
  res.render(folder + '/check/claim-confidentiality',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

// Invoicing / billing ========================================================



// This is not a real page, just a URL for the route
router.get('/billing/invoice-options-check', function (req, res) {
  if( req.session.data['siteAddress']==null && req.session.data['companyAddress']==null ) {
      res.render(folder + '/billing/invoice-postcode',{
      "formAction":"/"+ folder + "/billing/invoice-address"
      })
  } else {
      res.render(folder + '/billing/invoice-address-options',{
      "formAction":"/"+ folder + "/billing/invoice-option"
   })
  }
})

// This is not a real page, just a URL for the route
// Give a different invoice address or select registered office / site address
router.post('/billing/invoice-option', function (req, res) {
  if( req.session.data['invoiceAddress'] == "Different address" ) {
      res.render(folder + '/billing/invoice-postcode',{
      "formAction":"/"+ folder + "/billing/invoice-address"
      })
  } else {
      res.render(folder + '/billing/invoice-contact',{
      "formAction":"/"+ folder + "/check/task-list"
   })
  }
})

router.get('/billing/invoice-postcode', function (req, res) {
 res.render(folder + '/billing/invoice-postcode',{
     "formAction":"/"+ folder + "/billing/invoice-address"
 })
})


router.post('/billing/invoice-postcode', function (req, res) {
 res.render(folder + '/billing/invoice-postcode',{
     "formAction":"/"+ folder + "/billing/invoice-address"
 })
})

router.post('/billing/invoice-address', function (req, res) {
 res.render(folder + '/billing/invoice-address',{
     "formAction":"/"+ folder + "/billing/invoice-contact"
 })
})

router.post('/billing/invoice-contact', function (req, res) {
 res.render(folder + '/billing/invoice-contact',{
     "formAction":"/"+ folder + "/check/task-list"
 })
})

router.get('/bespoke/treatment-capacity', function (req, res) {
  res.render(folder + '/bespoke/treatment-capacity',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})


// NON TECH SUMMARY UPLOAD ========================================================
router.all('/upload-non-technical-summary', function (req, res) {
  var path="/upload-non-technical-summary"
  var title="Provide a non-technical summary"
  var fileName="NonTechSummary"
  var guidanceTop="nontechsummarytop"
  var guidanceBot=""
  var fileTypes="PDF, JPG, DOC or DOCX"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




// Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})


// GENERATOR LIST UPLOAD ========================================================
router.all('/generator-list-template', function (req, res) {
  var path="/generator-list-template"
  var title="Upload the completed plant or generator list template  "
  var fileName="GenTemplate"
  var guidanceTop=""
  var guidanceBot=""
  var fileTypes="XLS or ODS"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']

// Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})



// SCREENING TOOL UPLOAD ========================================================
router.all('/screening-tool', function (req, res) {
  var path="/screening-tool"
  var title="Upload the completed screening tool"
  var fileName="ScreeningTool"
  var guidanceTop="screeningtooltop"
  var guidanceBot=""
  var fileTypes="XLS or ODS"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']

    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})

// AIR DISPERSION MODELLING TOOL UPLOAD ========================================================
router.all('/modelling-tool', function (req, res) {
  var path="/modelling-tool"
  var title="Upload the air dispersion modelling report and screening tool"
  var fileName="ModellingTool"
  var guidanceTop="modellingtooltop"
  var guidanceBot=""
  var fileTypes="XLS or ODS"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']

// Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})

// ENERGY EFFECIENCY REPORT UPLOAD ========================================================
router.all('/energy-report', function (req, res) {
  var path="/energy-report"
  var title="Upload the energy efficiency report"
  var fileName="EnergyEfficiency"
  var guidanceTop="energyefficiencyreporttop"
  var guidanceBot=""
  var fileTypes="PDF, JPG, DOC or DOCX"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']

    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})

// BEST AVAILABLE TECHNIQUES BAT REPORT UPLOAD ========================================================
router.all('/bat-assessment-report', function (req, res) {
  var path="/bat-assessment-report"
  var title="Upload the best available techniques (BAT) assessment"
  var fileName="BatAssessment"
  var guidanceTop="batassessmenttop"
  var guidanceBot=""
  var fileTypes="PDF, JPG, DOC or DOCX"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']

    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})

// Environmental risk assessment ==========================================================
router.get('/bespoke/upload-environmental-risk-assessment', function (req, res) {
  res.render(folder + '/bespoke/upload-environmental-risk-assessment',{
        "formAction":"/"+ folder + "/check-environmental-risk-assessment"
    })
})

// fake route for first check of file uploads
router.post('/check-environmental-risk-assessment', function (req, res) {
    res.render(folder + '/bespoke/upload-environmental-risk-assessment',{
      "formAction":"/"+ folder + "/check-environmental-risk-assessment2"
    })
})

// fake route for second check of file uploads
router.post('/check-environmental-risk-assessment2', function (req, res) {
  if(req.session.data['uploadOtherFile']=="yes"){
    res.render(folder + '/bespoke/upload-environmental-risk-assessment',{
      "formAction":"/"+ folder + "/check-environmental-risk-assessment2"
    })
  } else {
    // Display task list
    res.render(folder + '/check/task-list',{
        "formAction":"/"+ folder + "/check/task-list"
    })
  }
})


// EUROPEAN WASTE CODES UPLOAD ========================================================
router.all('/upload-waste-codes', function (req, res) {
  var path="/upload-waste-codes"
  var title="Upload a document that lists the waste codes you want to accept"
  var fileName="WasteCodes"
  var guidanceTop="wastecodestop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX, XLSX or XLS"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']

    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})

// EUROPEAN WASTE CODES UPLOAD 2 ========================================================
router.post('/provide-ewc-codes-activity-1', function (req, res) {
  if (req.session.data['ewcCodesInputType'] === 'enterEwcCodes') {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-1-review-enter`)
  } else {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-1-review-upload`)
  }
})

router.post('/review-enter-ewc-codes-activity-1', function (req, res) {
  if (req.session.data['reenterEwcCodes']) {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-1-review-enter`)
  } else {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-2-provide`)
  }
})

router.post('/review-upload-ewc-codes-activity-1', function (req, res) {
  if (req.session.data['reenterEwcCodes']) {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-1-review-upload`)
  } else {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-2-provide`)
  }
})

router.post('/provide-ewc-codes-activity-2', function (req, res) {
  if (req.session.data['ewcCodesInputType'] === 'enterEwcCodes') {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-2-review-enter`)
  } else {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-2-review-upload`)
  }
})

router.post('/review-enter-ewc-codes-activity-2', function (req, res) {
  if (req.session.data['reenterEwcCodes']) {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-2-review-enter`)
  } else {
    res.redirect(`/${folder}/bespoke/ewc-codes/review`)
  }
})

router.post('/review-upload-ewc-codes-activity-2', function (req, res) {
  if (req.session.data['reenterEwcCodes']) {
    res.redirect(`/${folder}/bespoke/ewc-codes/activity-2-review-upload`)
  } else {
    res.redirect(`/${folder}/bespoke/ewc-codes/review`)
  }
})

// ENVIRONMENTAL RISK ASSESSMENT UPLOAD ========================================================
router.all('/upload-environmental-risk-assessment', function (req, res) {
  var path="/upload-environmental-risk-assessment"
  var title="Upload the environmental risk assessment"
  var fileName="EnvRiskAssessment"
  var guidanceTop="envriskassesstop"
  var guidanceBot=""
  var fileTypes="PDF, JPG, DOC or DOCX"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})

// FIRE PLAN UPLOAD ========================================================
router.all('/upload-fire-plan', function (req, res) {
  var path="/upload-fire-plan"
  var title="Upload the fire prevention plan"
  var fileName="FirePlan"
  var guidanceTop="fireplantop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX, XLS, XLSX, JPG, ODT or ODS"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})

// SITE CONDITION REPORT ==========================================================

router.all('/upload-site-condition-report', function (req, res) {
  var path="/upload-site-condition-report"
  var title="Complete and upload a site condition report"
  var fileName="SiteCondition"
  var guidanceTop="siteconditiontop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX or JPG"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})


// SITE PLAN UPLOAD ========================================================
router.all('/upload-site-plan', function (req, res) {
  var path="/upload-site-plan"
  var title="Upload a site plan"
  var fileName="SitePlan"
  var guidanceTop="siteplantop"
  var guidanceBot=""
  var fileTypes="PDF or JPG"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})



// LIST TECH STANDARDS UPLOAD ========================================================
router.all('/list-technical-standards', function (req, res) {
  var path="/list-technical-standards"
  var title="List the technical standards you use"
  var fileName="TechStandards"
  var guidanceTop="techstandardslisttop"
  var guidanceBot=""
  var fileTypes="PDF, JPG, DOC or DOCX"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})



// ODOUR MANAGEMENT PLAN UPLOAD ========================================================
router.all('/upload-odour-management-plan', function (req, res) {
  var path="/upload-odour-management-plan"
  var title="Upload the odour management plan"
  var fileName="OdourPlan"
  var guidanceTop="odourplantop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX or JPG"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})


// EMISSIONS PLAN UPLOAD ========================================================
router.all('/upload-emissions-management-plan', function (req, res) {
  var path="/upload-emissions-management-plan"
  var title="Upload the emissions management plan"
  var fileName="EmissionsPlan"
  var guidanceTop="emissionsplantop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX or JPG"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})



// NOISE PLAN UPLOAD ========================================================
router.all('/upload-noise-plan', function (req, res) {
  var path="/upload-noise-plan"
  var title="Upload the noise and vibration management plan"
  var fileName="NoisePlan"
  var guidanceTop="noiseplantop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX or JPG"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})

router.get('/bespoke/substance-release', function (req, res) {
  res.render(folder + '/bespoke/substance-release',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})


// Site ===================================================================

// site/site-name > /site/grid-reference > /address/postcode > /address/address
// > /evidence/check-site-plan > /check/task-list

// Add new page site/reason. Link from task-list will be a get
//router.get('/site/reason', function (req, res) {
//  res.render(folder + '/site/reason',{
//      "formAction":"/"+ folder + "/site/site-name",
//      "permit":req.session.permit // always send permit object to page
//  })
//})

router.get('/site/site-name', function (req, res) {
  res.render(folder + '/site/site-name',{
      "formAction":"/"+ folder + "/site/grid-reference"
  })
})

router.post('/site/grid-reference', function (req, res) {
  if(req.session.data['locationCheck']=="Yes"){
      res.render(folder + '/site/grid-reference',{
          "formAction":"/"+ folder + "/screening/screening-site-plan"
      })
  } else {
  res.render(folder + '/site/grid-reference',{
      "formAction":"/"+ folder + "/address/postcode"
   })
  }
})


router.post('/address/postcode', function (req, res) {
  res.render(folder + '/address/postcode',{
      "formAction":"/"+ folder + "/address/address"
  })
})

// Location check
router.post('/address/address', function (req, res) {
  if(req.session.data['locationCheck']=="Yes"){
    res.render(folder + '/address/address',{
        "formAction":"/"+ folder + "/contact/contact-details"
    })
  } else {
    res.render(folder + '/address/address',{
        "formAction":"/"+ folder + "/check/task-list"
    })
  }
})


// Manual address is a link - so a GET
router.get('/address/address-manual', function (req, res) {
  res.render(folder + '/address/address-manual',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

// Technical ability ==========================================================



router.get('/evidence/techcomp/industry-scheme', function (req, res) {
  res.render(folder + '/evidence/techcomp/industry-scheme',{
      "formAction":"/"+ folder + "/evidence/techcomp/get-evidence"
  })
})



// Not a page - just a route to process the form
router.post('/evidence/techcomp/check-file', function (req, res) {
      res.render(folder + '/evidence/techcomp/wamitab-details',{
          "formAction":"/"+ folder + "/evidence/techcomp/manager-details"
      })
})

router.get('/evidence/techcomp/manager-details', function (req, res) {
  res.render(folder + '/evidence/techcomp/manager-details',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

// The 4 options with GET then go back to task list

router.get('/evidence/techcomp/wamitab-details', function (req, res) {
  res.render(folder + '/evidence/techcomp/wamitab-details',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/evidence/techcomp/esa-eu-details', function (req, res) {
  res.render(folder + '/evidence/techcomp/esa-eu-details',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/evidence/techcomp/deemed', function (req, res) {
  res.render(folder + '/evidence/techcomp/deemed',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/evidence/techcomp/getting-it', function (req, res) {
  res.render(folder + '/evidence/techcomp/getting-it',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})


// Check answers GET
router.get('/evidence/techcomp/industry-check-answer', function (req, res) {
  res.render(folder + '/evidence/techcomp/industry-check-answer',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})



// GET TECHNICAL COMPETENCE UPLOADS
router.all('/evidence/techcomp/get-evidence', function (req, res) {
  var path="/evidence/techcomp/get-evidence"
  var fileTypes="PDF or JPG"
  var fileName="TechnicalCompetenceFile"
  var guidanceBot=""

  if( req.session.data['industryScheme']=='WAMITAB' ) {
    var title="WAMITAB or EPOC: upload your evidence"
    var guidanceTop="wamitabtop"
  } else if( req.session.data['industryScheme']=='ESA-EU' ) {
    var title="Energy &amp; Utility Skills / ESA: upload your evidence"
    var guidanceTop="esaqualtop"
  } else if( req.session.data['industryScheme']=='deemed' ) {
    var title="Upload the evidence for your qualification"
    var guidanceTop="deemedqualtop"
  } else if( req.session.data['industryScheme']=='getting-qualification' ) {
    var title="Getting a qualification: upload your evidence"
    var guidanceTop="gettingqualtop"
  }

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})


router.get('/bespoke/emissions/emissions-check', function (req, res) {
  res.render(folder + '/bespoke/emissions/emissions-check',{
     "formAction":"/"+ folder + "/emissions-check"
  })
})

// Deal with what to show after emissions question
router.post('/emissions-check', function (req, res) {
  if(req.body['emissionsYesNo']==="yes"){
    // show upload
    res.redirect("/"+ folder + "/upload-emissions-to-air-water-land")
  } else {
    // show task list
    res.render(folder + '/check/task-list',{
    })
  }
})

router.get('/bespoke/management-system', function (req, res) {
  res.render(folder + '/bespoke/management-system',{
      "formAction":"/"+ folder + "/upload-management-system-summary"
  })
})

// EMISSIONS TO AIR WATER AND LAND UPLOAD ========================================================
router.all('/upload-emissions-to-air-water-land', function (req, res) {
  var path="/upload-emissions-to-air-water-land"
  var title="Upload details on emissions to air water and land"
  var fileName="EmissionsAirWaterLand"
  var guidanceTop="emissionsairwaterlandtop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX or JPG"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})



// MANAGEMENT SYSTEM UPLOAD ========================================================
router.all('/upload-management-system-summary', function (req, res) {
  var path="/upload-management-system-summary"
  var title="Upload a summary of your management system"
  var fileName="ManSysSummary"
  var guidanceTop="mansyssummarytop"
  var guidanceBot=""
  var fileTypes="PDF, JPG, DOC or DOCX"

  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']




    // Back to the task list
res.redirect(`/${folder}/check/task-list`)

  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})

// R & D codes ===========================================================

router.get('/RDcodes/list_recovery_codes', function (req, res) {
  res.render(folder + '/RDcodes/list_recovery_codes',{
    "formAction":"/"+ folder + "/RDcodes/list_disposal_codes"
  })
})

router.get('/RDcodes/list_disposal_codes', function (req, res) {
  res.render(folder + '/RDcodes/list_disposal_codes',{
    "formAction":"/"+ folder + "/check/task-list"
  })
})


// Check answers ===================================================================

router.get('/check/check-answers', function (req, res) {
  res.render(folder + '/check/check-answers',{
      "formAction":"/"+ folder + "/pay/enter-card-details"
  })
})

router.post('/check/check-answers', function (req, res) {
  var payPath = ""
  if(paymentMethod=="govpay"){  // yes I know this is ugly
    payPath = "/pay/payment-method"
  }
  if(paymentMethod=="worldpay"){
    payPath = "/pay/payment-method"
  }

  if(req.body['complete']=="" || req.body['complete']==null){
    res.render(folder + '/check/check-answers',{
        // "formAction":"/"+ folder + "/pay/payment-method", THIS WAS FOR PAYMENT METHOD
        "formAction":"/"+ folder + payPath
    })
  } else {
    var taskListError = true
    // show error
    // instead of /check/not-complete, render task list again
    res.render(folder + '/check/task-list',{
        'taskListError': taskListError,
        // "formAction":"/"+ folder + "/check/task-list"
    })
  }
})

router.get('/check/not-complete', function (req, res) {
  res.render(folder + '/check/not-complete',{
  })
})


// Sections: check your answers

router.get('/preapp/check-your-answers', function (req, res) {
  res.render(folder + '/preapp/check-your-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/contact/check-your-answers', function (req, res) {
  res.render(folder + '/contact/check-your-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/operator/check-your-answers', function (req, res) {
  res.render(folder + '/operator/check-your-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/site/check-your-answers', function (req, res) {
  res.render(folder + '/site/check-your-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/site/site-plan-check-your-answers', function (req, res) {
  res.render(folder + '/site/site-plan-check-your-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/evidence/industry-check-answers', function (req, res) {
  res.render(folder + '/evidence/industry-check-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/evidence/management-check-answers', function (req, res) {
  res.render(folder + '/evidence/management-check-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/evidence/fire-plan-check-answers', function (req, res) {
  res.render(folder + '/evidence/fire-plan-check-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/check/confidentiality-check-answers', function (req, res) {
  res.render(folder + '/check/confidentiality-check-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/billing/check-your-answers', function (req, res) {
  res.render(folder + '/billing/check-your-answers',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})


// Submit and pay ======================================================
router.get('/check/declaration', function (req, res) {
  res.render(folder + '/check/declaration',{
        "formAction":"/"+ folder + "/pay/payment-method"
    })
})

router.post('/check/declaration', function (req, res) {
  res.render(folder + '/check/declaration',{
      "formAction":"/"+ folder + "/pay/payment-method"
  })
})



// Pay ===================================================================

router.post('/pay/payment-method', function (req, res) {
  res.render(folder + '/pay/payment-method',{
      "formAction":"/"+ folder + "/pay/how-to-pay"
  })
})

// This is not a real page, just a URL for the route
router.post('/pay/how-to-pay', function (req, res) {
  if(req.body['paymentMethod']=="Debit or credit card"){ // think you need square bracket for radios
    // show details page
      res.render(folder + '/pay/enter-card-details',{
          "formAction":"/"+ folder + "/pay/confirm-payment"
      })
  } else if(req.body['paymentMethod']=="Bank transfer") {
    // go on to bankruptcy
    res.render(folder + '/pay/pay-by-bank-transfer',{
        "formAction":"/"+ folder + "/pay/proof-of-payment"
    })
  } else {
    // go on to cheque
    res.render(folder + '/pay/pay-by-cheque',{
        "formAction":"/"+ folder + "/done/index"
    })
  }
})

// ENTER CARD DETAILS
router.post('/pay/enter-card-details', function (req, res) {
  res.render(folder + '/pay/enter-card-details',{
      "formAction":"/"+ folder + "/pay/confirm-payment"
  })
})

router.post('/pay/confirm-payment', function (req, res) {
  res.render(folder + '/pay/confirm-payment',{
      "formAction":"/"+ folder + "/done/index"
  })
})


// for worldpay instead of gov pay
router.get('/pay/worldpay/worldpay-card-details', function (req, res) {
  res.render(folder + '/pay/worldpay/worldpay-card-details',{
      "formAction":"/"+ folder + "/pay/worldpay/worldpay-success"
  })
})

router.get('/pay/worldpay/worldpay-success', function (req, res) {
  res.render(folder + '/pay/worldpay/worldpay-success',{
      "formAction":"/"+ folder + "/done/index" // previously /printcopy/index
  })
})



// Get copy of application

router.post('/printcopy/index', function (req, res) {
  res.render(folder + '/printcopy/index',{
      "formAction":"/"+ folder + "/done/index"
  })
})

// fake PDF
router.get('/printcopy/app-pdf', function (req, res) {
  res.render(folder + '/printcopy/app-pdf',{
  })
})

router.post('/done/index', function (req, res) {
  res.render(folder + '/done/index',{
      "formAction":"NOT_NEEDED"
  })
})

// /v2/done/email-confirm Confirmation email

router.get('/done/email-confirm', function (req, res) {
  res.render(folder + '/done/email-confirm',{
      "formAction":"NOT_NEEDED"
  })
})

const bespokeWasteDummyData = { 
  bespokePermit: 'bespoke',
  operatorType: 'Sole trader',
  preAppYesNo: 'no',
  companyName: 'Hill farm treatment site',
  companyAddress: 'Hill farm treatment site, Orchard Road, Filton, Bristol, BS4 12IL',
  preAppRef: 'Pre-application reference number',
  facilityType: 'Waste treatment',
  permitRefNumber: 'EPR/WV6123XF',
  siteOrMobile: 'site',
  chosenPermitID: [ '1.16.19' ],
  odourManagementPlanIncluded: 'yes',
  odourManagementPlan: 'no',
  totalcost: '10141',
  saveReturnEmail: 'Register to return to this application email address',
  saveProgress: 'save-link-sent',
  GOTEMAIL: 'yes',
  contactFirstName: 'Dylan',
  contactLastName: 'Thomas',
  agentCompany: '',
  contactTelephone: '07710555678',
  contactEmail: 'dylan.thomas@gmail.com',
  Continue: '',
  siteContactFirstName: 'Anne',
  siteContactLastName: 'Janes',
  siteContactTelephone: '07756444356r',
  companySecretaryEmail: 'bob.dylan@gmail.com',
  waste_operation_name: 'Waste treatment',
  waste_operation_description: 'Treating farm',
  offences: 'no',
  siteContactEmail: 'anne.janes@gmail.com',
  'first-name-2': 'Seb',
  'last-name-2': 'Jones',
  'dob-day': '01',
  'dob-month': '02',
  'dob-year': '03',
  'radio-contact-group': 'No',
  'contact-phone': 'seb.jones@live.co.uk',
  'contact-email': '07786555368',
  sitePostCode: 'Permit holder - postcode',
  director: ['07 08'],
  individualAddress: '3, GRANGE ROAD, BRISTOL',
  relevantOffencesDetails: 'Convictions details',
  bankruptcyInsolvency: 'yes',
  bankruptcyInsolvencyDetails: 'Bankruptcy details',
  confidential: 'yes',
  confidentialReasons: 'Confidentiality details',
  invoicePostCode: 'Invoices - postcode',
  invoiceAddress: '3, GRANGE ROAD, BRISTOL',
  invoiceName: 'Invoicing - Name',
  invoiceEmail: 'Invoicing - Email address',
  invoiceTelephone: 'Invoicing - Telephone number',
  max_waste_stored: 'Waste - maximum',
  annual_throughput: 'Waste - throughput',
  nonhazardous_waste_treatment_capacity: 'Waste - non-hazardous capacity',
  hazardous_waste_treatment_capacity: 'Waste - hazardous capacity',
  NonTechSummary1: 'NonTechSummary.pdf',
  sewerage: [ 'yes' ],
  harbour: [ 'yes' ],
  fisheries: [ 'yes' ],
  substanceRelease: 'Yes',
  sewerageUndertakerName: 'Sewerageundertakername@test.com',
  harbourAuthorityName: 'Harbour authority name',
  'contact-by-text': 'Fisheries committee name',
  siteName: 'Site name',
  siteGridRef: 'Site grid reference',
  siteAddress: '3, GRANGE ROAD, BRISTOL',
  SiteCondition1: 'SiteCondition.pdf',
  SitePlan1: 'SitePlan.pdf',
  RCodes:
  [ 'R1 Use principally as a fuel or other means to generate energy',
  'R2 Solvent reclamation/regeneration',
  'R3 Recycling/reclamation of organic substances which are not used as solvents' ],
  DCodes:
  [ 'D1 Deposit into or on to land',
  'D2 Land treatment',
  'D3 Deep injection' ],
  RDCode_entered: 'Yes',
  WasteCodes1: 'WasteCodes.pdf',
  industryScheme: 'WAMITAB',
  TechnicalCompetenceFile1: 'TechnicalCompetenceFile.pdf',
  EnvRiskAssessment1: 'EnvRiskAssessment.pdf',
  emissionsYesNo: 'yes',
  EmissionsAirWaterLand1: 'EmissionsAirWaterLand.pdf',
  manSys: 'EC Eco management and audit scheme (EMAS)',
  ManSysSummary1: 'ManSysSummary.pdf',
  TechStandards1: 'TechStandards.pdf',
  OdourPlan1: 'OdourPlan.pdf' 
}

const smcpDummyData = { 
  permitoperation: 'mcp',
  'started-application': 'no',
  permitRefNumber: 'EPR/KF3056VT',
  bespokePermit: 'bespoke',
  facilityType: 'mcp and sg',
  siteOrMobile: 'site',
  generatorType: 'smcp',
  eprPermit: 'no',
  hours: 'no',
  dispersionModelling: 'yes',
  energyEffiencyReport: 'yes',
  'biomas-burn-rate': 'yes',
  exceed1mwth: 'yes',
  habitatAssessment: 'yes',
  totalcost: '7329',
  'Confirm and pay': '',
  saveReturnEmail: 'test@test.com',
  saveProgress: 'save-link-sent',
  GOTEMAIL: 'YES',
  isContactAnAgent: ['yes'],
  contactFirstName: 'First',
  contactLastName: 'Last',
  agentCompany: 'Agent',
  contactTelephone: '0123456789',
  contactEmail: 'contact@details.com',
  Continue: '',
  siteContactFirstName: 'Site',
  siteContactLastName: 'Contact',
  siteContactTelephone: '0123456789',
  siteContactEmail: 'site@contact.com',
  operatorType: 'Sole trader',
  'first-name-2': 'Permit', 
  'last-name-2': 'Holder',
  'dob-day': '01',
  'dob-month':'02',
  'dob-year':'71',
  'radio-contact-group':'No',
  'contact-phone': 'permit@holder.com',
  'contact-email':'0123456789',
  sitePostCode: 'BS1 5AH',
  individualAddress: 'Flat 1, 19, GRANGE ROAD, BRISTOL',
  offences: 'yes',
  relevantOffencesDetails: 'Conviction details',
  bankruptcyInsolvency: 'yes',
  bankruptcyInsolvencyDetails: 'Bankruptcy details',
  confidential: 'yes',
  confidentialReasons: 'Confidentiality reasons',
  invoicePostCode: 'BS1 5AH',
  invoiceAddress: '3, GRANGE ROAD, BRISTOL',
  invoiceName: 'Invoicing contact',
  invoiceEmail: 'invoicing@contact.com',
  invoiceTelephone: '0123456789',
  siteName: 'Test site', 
  siteGridRef: 'ST 58132 72695',
  sitePostCode: 'BS1 5AH',
  siteAddress: '3, GRANGE ROAD, BRISTOL',
  NonTechSummary1: 'Non technical summary.pdf',
  NonTechSummary2: '',
  Confirmandpay: ['yes',''],
  GenTemplate1: 'Plant generator list template.xls',
  GenTemplate2: '',
  nacecodes: ['Production of electricity 35.11',''],
  ModellingTool1: 'Test air dispersion modelling report.pdf', 
  ModellingTool2: '', 
  EnergyEfficiency1: 'Test energy efficiency report.pdf',
  EnergyEfficiency2: '', 
  BatAssessment1: 'Test best available techniques assessment.pdf', 
  BatAssessment2: '',
  aqma: 'email', 
  aqmaname: 'Test AQMA',
  aqmala: 'Test Local Authority',
  nitrogendioxide: '100'
}

const ssgDummyData = { 
  permitoperation: 'mcp',
  'started-application': 'no',
  permitRefNumber: 'EPR/KF3056VT',
  bespokePermit: 'bespoke',
  facilityType: 'mcp and sg',
  siteOrMobile: 'site',
  generatorType: 'ssg',
  eprPermit: 'no',
  hours: 'no',
  dispersionModelling: 'yes',
  '20-50mw': 'yes',
  'energysource': 'boiler-furnace-gas',
  habitatAssessment: 'yes',
  totalcost: '7329',
  'Confirm and pay': '',
  saveReturnEmail: 'test@test.com',
  saveProgress: 'save-link-sent',
  GOTEMAIL: 'YES',
  isContactAnAgent: ['yes'],
  contactFirstName: 'First',
  contactLastName: 'Last',
  agentCompany: 'Agent',
  contactTelephone: '0123456789',
  contactEmail: 'contact@details.com',
  Continue: '',
  siteContactFirstName: 'Site',
  siteContactLastName: 'Contact',
  siteContactTelephone: '0123456789',
  siteContactEmail: 'site@contact.com',
  operatorType: 'Sole trader',
  'first-name-2': 'Permit', 
  'last-name-2': 'Holder',
  'dob-day': '01',
  'dob-month':'02',
  'dob-year':'71',
  'radio-contact-group':'No',
  'contact-phone': 'permit@holder.com',
  'contact-email':'0123456789',
  sitePostCode: 'BS1 5AH',
  individualAddress: 'Flat 1, 19, GRANGE ROAD, BRISTOL',
  offences: 'yes',
  relevantOffencesDetails: 'Conviction details',
  bankruptcyInsolvency: 'yes',
  bankruptcyInsolvencyDetails: 'Bankruptcy details',
  confidential: 'yes',
  confidentialReasons: 'Confidentiality reasons',
  invoicePostCode: 'BS1 5AH',
  invoiceAddress: '3, GRANGE ROAD, BRISTOL',
  invoiceName: 'Invoicing contact',
  invoiceEmail: 'invoicing@contact.com',
  invoiceTelephone: '0123456789',
  siteName: 'Test site', 
  siteGridRef: 'ST 58132 72695',
  sitePostCode: 'BS1 5AH',
  siteAddress: '3, GRANGE ROAD, BRISTOL',
  NonTechSummary1: 'Non technical summary.pdf',
  NonTechSummary2: '',
  Confirmandpay: ['yes',''],
  GenTemplate1: 'Plant generator list template.xls',
  GenTemplate2: '',
  nacecodes: ['Production of electricity 35.11',''],
  ModellingTool1: 'Test air dispersion modelling report.pdf', 
  ModellingTool2: '',
  BatAssessment1: 'Test best available techniques assessment.pdf', 
  BatAssessment2: '',
  aqma: 'email', 
  aqmaname: 'Test AQMA',
  aqmala: 'Test Local Authority',
  nitrogendioxide: '100'
}

const smcpAlsoSgDummyData = { 
  permitoperation: 'mcp',
  'started-application': 'no',
  permitRefNumber: 'EPR/KF3056VT',
  bespokePermit: 'bespoke',
  facilityType: 'mcp and sg',
  siteOrMobile: 'site',
  generatorType: 'smcp also sg',
  eprPermit: 'no',
  hours: 'no',
  dispersionModelling: 'yes',
  energyEffiencyReport: 'yes',
  '20-50mw': 'yes',
  'energysource': 'boiler-furnace-gas',
  habitatAssessment: 'yes',
  totalcost: '7329',
  'Confirm and pay': '',
  saveReturnEmail: 'test@test.com',
  saveProgress: 'save-link-sent',
  GOTEMAIL: 'YES',
  isContactAnAgent: ['yes'],
  contactFirstName: 'First',
  contactLastName: 'Last',
  agentCompany: 'Agent',
  contactTelephone: '0123456789',
  contactEmail: 'contact@details.com',
  Continue: '',
  siteContactFirstName: 'Site',
  siteContactLastName: 'Contact',
  siteContactTelephone: '0123456789',
  siteContactEmail: 'site@contact.com',
  operatorType: 'Sole trader',
  'first-name-2': 'Permit', 
  'last-name-2': 'Holder',
  'dob-day': '01',
  'dob-month':'02',
  'dob-year':'71',
  'radio-contact-group':'No',
  'contact-phone': 'permit@holder.com',
  'contact-email':'0123456789',
  sitePostCode: 'BS1 5AH',
  individualAddress: 'Flat 1, 19, GRANGE ROAD, BRISTOL',
  offences: 'yes',
  relevantOffencesDetails: 'Conviction details',
  bankruptcyInsolvency: 'yes',
  bankruptcyInsolvencyDetails: 'Bankruptcy details',
  confidential: 'yes',
  confidentialReasons: 'Confidentiality reasons',
  invoicePostCode: 'BS1 5AH',
  invoiceAddress: '3, GRANGE ROAD, BRISTOL',
  invoiceName: 'Invoicing contact',
  invoiceEmail: 'invoicing@contact.com',
  invoiceTelephone: '0123456789',
  siteName: 'Test site', 
  siteGridRef: 'ST 58132 72695',
  sitePostCode: 'BS1 5AH',
  siteAddress: '3, GRANGE ROAD, BRISTOL',
  NonTechSummary1: 'Non technical summary.pdf',
  NonTechSummary2: '',
  Confirmandpay: ['yes',''],
  GenTemplate1: 'Plant generator list template.xls',
  GenTemplate2: '',
  nacecodes: ['Production of electricity 35.11',''],
  ModellingTool1: 'Test air dispersion modelling report.pdf', 
  ModellingTool2: '', 
  EnergyEfficiency1: 'Test energy efficiency report.pdf',
  EnergyEfficiency2: '', 
  BatAssessment1: 'Test best available techniques assessment.pdf', 
  BatAssessment2: '',
  aqma: 'email', 
  aqmaname: 'Test AQMA',
  aqmala: 'Test Local Authority',
  nitrogendioxide: '100'
}

const mobileSgDummyData = {
  permitoperation: 'mcp',
  'started-application': 'no',
  permitRefNumber: 'EPR/WV6123XF',
  bespokePermit: 'bespoke',
  facilityType: 'mcp and sg',
  siteOrMobile: 'site',
  generatorType: 'mobile sg',
  eprPermit: 'no',
  totalcost: '7329',
  'Confirm and pay': '',
  saveReturnEmail: 'test@test.com',
  saveProgress: 'save-link-sent',
  GOTEMAIL: 'YES',
  isContactAnAgent: ['yes'],
  contactFirstName: 'First',
  contactLastName: 'Last',
  agentCompany: 'Agent',
  contactTelephone: '0123456789',
  contactEmail: 'contact@details.com',
  Continue: '',
  siteContactFirstName: 'Site',
  siteContactLastName: 'Contact',
  siteContactTelephone: '0123456789',
  siteContactEmail: 'site@contact.com',
  operatorType: 'Sole trader',
  'first-name-2': 'Permit', 
  'last-name-2': 'Holder',
  'dob-day': '01',
  'dob-month':'02',
  'dob-year':'71',
  'radio-contact-group':'No',
  'contact-phone': 'permit@holder.com',
  'contact-email':'0123456789',
  sitePostCode: 'BS1 5AH',
  individualAddress: 'Flat 1, 19, GRANGE ROAD, BRISTOL',
  offences: 'yes',
  relevantOffencesDetails: 'Conviction details',
  bankruptcyInsolvency: 'yes',
  bankruptcyInsolvencyDetails: 'Bankruptcy details',
  confidential: 'yes',
  confidentialReasons: 'Confidentiality reasons',
  invoicePostCode: 'BS1 5AH',
  invoiceAddress: '3, GRANGE ROAD, BRISTOL',
  invoiceName: 'Invoicing contact',
  invoiceEmail: 'invoicing@contact.com',
  invoiceTelephone: '0123456789',
  NonTechSummary1: 'Non technical summary.pdf',
  NonTechSummary2: '',
  Confirmandpay: ['yes',''],
  GenTemplate1: 'Plant generator list template.xls',
  GenTemplate2: ''
}

const mobileMcpDummyData = {
  permitoperation: 'mcp',
  'started-application': 'no',
  permitRefNumber: 'EPR/WV6123XF',
  bespokePermit: 'bespoke',
  facilityType: 'mcp and sg',
  siteOrMobile: 'site',
  generatorType: 'mobile mcp',
  eprPermit: 'no',
  energyEffiencyReport: 'yes',
  totalcost: '7329',
  'Confirm and pay': '',
  saveReturnEmail: 'test@test.com',
  saveProgress: 'save-link-sent',
  GOTEMAIL: 'YES',
  isContactAnAgent: ['yes'],
  contactFirstName: 'First',
  contactLastName: 'Last',
  agentCompany: 'Agent',
  contactTelephone: '0123456789',
  contactEmail: 'contact@details.com',
  Continue: '',
  siteContactFirstName: 'Site',
  siteContactLastName: 'Contact',
  siteContactTelephone: '0123456789',
  siteContactEmail: 'site@contact.com',
  operatorType: 'Sole trader',
  'first-name-2': 'Permit', 
  'last-name-2': 'Holder',
  'dob-day': '01',
  'dob-month':'02',
  'dob-year':'71',
  'radio-contact-group':'No',
  'contact-phone': 'permit@holder.com',
  'contact-email':'0123456789',
  sitePostCode: 'BS1 5AH',
  individualAddress: 'Flat 1, 19, GRANGE ROAD, BRISTOL',
  offences: 'yes',
  relevantOffencesDetails: 'Conviction details',
  bankruptcyInsolvency: 'yes',
  bankruptcyInsolvencyDetails: 'Bankruptcy details',
  confidential: 'yes',
  confidentialReasons: 'Confidentiality reasons',
  invoicePostCode: 'BS1 5AH',
  invoiceAddress: '3, GRANGE ROAD, BRISTOL',
  invoiceName: 'Invoicing contact',
  invoiceEmail: 'invoicing@contact.com',
  invoiceTelephone: '0123456789',
  NonTechSummary1: 'Non technical summary.pdf',
  NonTechSummary2: '',
  Confirmandpay: ['yes',''],
  GenTemplate1: 'Plant generator list template.xls',
  GenTemplate2: '',
  nacecodes: ['Production of electricity 35.11',''],
  EnergyEfficiency1: 'Test energy efficiency report.pdf',
  EnergyEfficiency2: '', 
}

// set up dummy data
router.get('/dummy', function (req, res) {
  if (req.session.data.facilityType === 'Waste treatment') {
    req.session.data = bespokeWasteDummyData
  } else if (req.session.data.facilityType === 'mcp and sg') {
    if (req.session.data.generatorType === 'smcp') {
      req.session.data = smcpDummyData
    } else if (req.session.data.generatorType === 'ssg') {
      req.session.data = ssgDummyData
    } else if (req.session.data.generatorType === 'smcp also sg') {
      req.session.data = smcpAlsoSgDummyData
    } else if (req.session.data.generatorType === 'mobile sg') {
      req.session.data = mobileSgDummyData
    } else if (req.session.data.generatorType === 'mobile mcp') {
      req.session.data = mobileMcpDummyData
    }
  } 


  res.redirect(`/${folder}/check/task-list`)
})

// Select permit ==============================================================

// required for 'select a different permit' via start page or task list
router.get('/selectpermit/permit-category2', function (req, res) {
  res.render(folder + '/selectpermit/permit-category2',{
    "formAction":"/"+ folder + "/selectpermit/choose-permit2",
    "chosenPermitID":req.body['chosenPermitID']
  })
})

// The POST version
router.post('/selectpermit/permit-category2', function (req, res) {
console.log(req.body['permit-type'])
  // permit NOT YET selected
  if( req.session.data['chosenPermitID']==null ) {
    res.render(folder + '/selectpermit/permit-category2',{
      "formAction":"/"+ folder + "/selectpermit/check-category"
    })
  // permit set via link on a GOV.UK page so skip this page
  } else {
    res.render(folder + '/check/task-list',{ // show save and return pages
       "formAction":"/"+ folder + "/check/check-answers",
       "chosenPermitID":req.body['chosenPermitID']
    })
  }
})


// Check category is in-scope ============================

// required for 'select a different permit' via start page or task list
router.post('/selectpermit/bespoke-or-standard', function (req, res) {
  res.render(folder + '/selectpermit/bespoke-or-standard',{
    "formAction":"/"+ folder + "/start/start-or-resume"
    // "chosenPermitID":req.body['chosenPermitID']
  })
})

router.get('/selectpermit/bespoke-or-standard', function (req, res) {
  res.render(folder + '/selectpermit/bespoke-or-standard',{
    "formAction":"/"+ folder + "/start/start-or-resume"
    // "chosenPermitID":req.body['chosenPermitID']
  })
})

// required for 'select an activity for bespoke' via start page or task list
// router.post('/selectpermit/select-bespoke-or-standard', function (req, res) {
// if(req.body['bespokePermit']=="standard"){ // think you need square bracket for radios
//    res.render(folder + '/selectpermit/permit-category2',{
 //     "formAction":"/"+ folder + "/selectpermit/choose-permit2",
 //     "chosenPermitID":req.body['chosenPermitID']
 //   })
// } else if(req.body['bespokePermit']=="bespoke-other") {
  //  res.render(folder + '/selectpermit/bespoke-offline')
// } else {
 //   res.render(folder + '/bespoke/v2-activities/bespoke-category',{
 //       "formAction":"/"+ folder + "/bespoke/v2-activities/bespoke-choose-activity"
  //  })
// }
//})



router.post('/selectpermit/check-category', function (req, res) {
switch (req.body['chosenCategory']) {
  // These categories are NOT online
  case 'Flood risk activities':
  case 'Radioactive substances for non-nuclear sites':
  case 'Water discharges':
    // go on to 'paper' form page'
    return res.render(folder + '/selectpermit/permit-not-in-service',{})
}

switch (req.body['operatorType']) {
  case 'Limited company':
  case 'Sole trader':
  case 'Limited liability partnership':
  case 'Individual':
    // go on to choose permit
    return res.render(folder + '/selectpermit/choose-permit2',{
      "formAction":"/"+ folder + "/selectpermit/other-permits",
      "chosenCategory":req.body['chosenCategory']
    })
}

res.render(folder + '/selectpermit/permit-not-in-service',{})
})

// Choose permit ============================

router.post('/selectpermit/choose-permit2', function (req, res) {
if(typeof req.body['chosenCategory']==='undefined'){  // simple error handling
  res.render(folder + '/error/index',{
      "errorText":"Please say what you want the permit for"
  })
} else {
  res.render(folder + '/selectpermit/choose-permit2',{
    "formAction":"/"+ folder + "/selectpermit/save-permit-details",
    "chosenCategory":req.body['chosenCategory']
  })
}
})

// Save permit data ============================

router.post('/selectpermit/save-permit-details', function (req, res) {
  res.render(folder + '/selectpermit/save-permit-details',{
    "formAction":"/"+ folder + "/selectpermit/other-permits",
    "chosenPermitID":req.body['chosenPermitID']
  })
})


// Cost and time ==============================================================
router.get('/selectpermit/cost-and-time', function (req, res) {
  res.render(folder + '/selectpermit/cost-and-time',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})


// Read rules ===================================================================

router.get('/read-rules/index', function (req, res) {
  res.render(folder + '/read-rules/index',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

module.exports = router
