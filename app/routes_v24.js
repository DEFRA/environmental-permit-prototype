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
var submitButton = '<button type="submit" id="continueButton" class="govuk-button" name="Continue">Save and continue</button>'
var completeLink = '<a id="completeLink" href="/'+folder+'/save-and-return/check">Continue later</a>'
// completeLink WAS <span id="completeLink"><a href="#" id="completeLater">Complete later</a></span>

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


// permit holder screen
router.post('/operator/site-operator', function (req, res) {
  res.render(folder + '/operator/site-operator',{
      "formAction":"/"+ folder + "/bespoke/pre-app/pre-app"
  })
})

 router.get('/operator/site-operator', function (req, res) {
   res.render(folder + '/operator/site-operator',{
       "formAction":"/"+ folder + "/operator/checkoperator"
   })
 })

 // Pre-app ====================================================================

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

// permit holder screen
router.post('/operator/site-operator', function (req, res) {
  res.render(folder + '/operator/site-operator',{
      "formAction":"/"+ folder + "/bespoke/pre-app/pre-app"
  })
})

 router.get('/operator/site-operator', function (req, res) {
   res.render(folder + '/operator/site-operator',{
       "formAction":"/"+ folder + "/operator/checkoperator"
   })
 })

// After operator, route depends on permit type
router.post('/after-operator-choice', function (req, res) {
  if (req.session.data.bespokePermit=="bespoke") { // bespoke
    res.redirect("/"+ folder + "/bespoke/pre-app/pre-app")
  } else { // standard rule
    res.redirect("/"+ folder + "/selectpermit/permit-category2")
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
  } else {  
    res.redirect("/"+ folder + "/bespoke/offline/bespoke-selection-offline")
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
   req.session.data={add:[duplicates]} // add back into data object to use on name page

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

module.exports = router
