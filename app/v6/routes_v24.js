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
var submitButton = '<button type="submit" id="continueButton" class="button" name="Continue">Save and continue</button>'
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

// Route to check if application has started and redirect
router.post('/save-and-return/save-choice', function (req, res) {
  if (req.body['started-application']=="no") {
    res.redirect("/"+ folder + "/selectpermit/bespoke-or-standard")
  } else {
    res.redirect("/"+ folder + "/save-and-return/already-started")
  }
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



// What's next ===============================================================
router.get('/bespoke/whats-next', function (req, res) {
  res.render(folder + '/bespoke/whats-next',{
    "formAction":"/"+ folder + "/bespoke/activities-assessments/bespoke-type"
})

// Facility type ==============================================================
router.get('/bespoke/facility/facility-type', function (req, res) {
  res.render(folder + '/bespoke/facility/facility-type',{
    "formAction":"/"+ folder + "/facility-check"
  })
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


// Add and confirm
router.post('/bespoke/activities-assessments/add-confirm-1', function (req, res) {
    res.render(folder + '/bespoke/activities-assessments/add-confirm-1',{
      "formAction":"/"+ folder + "/name-check"
    })
})

// Add and confirm
router.get('/bespoke/activities-assessments/add-confirm-1', function (req, res) {
    var activityToAdd = req.query.add
    req.session.data.chosenPermitID.push(activityToAdd)
    res.render(folder + '/bespoke/activities-assessments/add-confirm-1',{
      "formAction":"/"+ folder + "/name-check"
    })
})


// Site or mobile =============================================
router.get('/bespoke/mobile-plant', function (req, res) {
  res.render(folder + '/bespoke/mobile-plant',{
    "formAction":"/"+ folder + "/bespoke/mobile-plant-check"
  })
})

// Site or mobile CHECK =============================================
// not a real page
router.post('/bespoke/mobile-plant-check', function (req, res) {
  var siteOrMobile = req.body.siteOrMobile

  if (siteOrMobile === "mobile") {
    res.redirect("/"+ folder + "/bespoke/activities-assessments/select-mobile-activity")
  } else {
    res.redirect("/"+ folder + "/bespoke/activities-assessments/bespoke-category")
  }
})

// Mobile activities =============================================
router.get('/bespoke/activities-assessments/select-mobile-activity', function (req, res) {
  res.render(folder + '/bespoke/activities-assessments/select-mobile-activity',{
    // for mobile - jump to materials
    "formAction":"/"+ folder + "/bespoke/check-assessments/materials-you-produce"
  })
})



// Sensitive receptor
router.post('/bespoke/check-assessments/sensitive-receptor', function (req, res) {
    res.render(folder + '/bespoke/check-assessments/sensitive-receptor',{
      "formAction":"/"+ folder + "/bespoke/check-assessments/air-quality-management-area"
    })
})

// Air quality management area
router.post('/bespoke/check-assessments/air-quality-management-area', function (req, res) {
    res.render(folder + '/bespoke/check-assessments/air-quality-management-area',{
      "formAction":"/"+ folder + "/bespoke/check-assessments/materials-you-produce"
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










// Confirm operator type=======================================================

router.get('/operator/company/company-decision', function (req, res) {
  // get the answer from the query string (eg. Limited company, individual, sole trader)
  var operatorType = req.query.operatorType

  if (operatorType === 'Limited company') {
    // redirect to the relevant page
    res.redirect("/"+ folder + '/operator/company/company-name')

  } else if (operatorType === 'Individual') {
      // redirect to the relevant page
    res.redirect("/"+ folder + '/operator/individual/individual-details')

  } else if (operatorType === 'Sole trader') {
    // if operator type is sole trader (or is missing) redirect to the page requested
    res.redirect("/"+ folder + '/operator/sole-trader/sole-trader')

  } else if (operatorType === 'Limited liability partnership') {
    // if operator type is limited liability partnership (or is missing) redirect to the page requested
    res.redirect("/"+ folder + '/operator/limited-liability-partnership/limited-liability-partnership-reference-no')
  }
})

module.exports = router





// save permit details is an autosubmit page ========================================
// used to store all the data from the matrix
router.post('/check/save-permit-details', function (req, res) {
    res.render(folder + '/check/save-permit-details',{
      "formAction":"/"+ folder + "/check/task-list",
      "chosenPermitID":req.body['chosenPermitID']
    })
})




// Rules page from list ==============================================================

router.get('/start/rules-page', function (req, res) {
  res.render(folder + '/start/rules-page',{
      "chosenPermitID":req.query['chosenPermitID']
  })
})

// This page should not show for long - it just saves permit data
router.get('/check/process-link', function (req, res) {
    res.render(folder + '/check/process-link',{ // show save and return pages
       "formAction":"/"+ folder + "/selectpermit/permit-category2",
       "chosenPermitID":req.query['chosenPermitID']
    })
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


// before you start pages
router.post('/selectpermit/before-you-start', function (req, res) {
    res.render(folder + '/selectpermit/before-you-start',{
      "formAction":"/"+ folder + "/check/task-list",
       "chosenPermitID":req.body['chosenPermitID']
    })
})



// Check permit via GET route for links
router.get('/check/task-list', function (req, res) {
  if(typeof req.query['chosenPermitID']==='undefined' && typeof     req.query['testmode']==='undefined'  && typeof     req.query['return']==='undefined'){  // simple error handling
    res.render(folder + '/error/index',{
        "errorText":"Please select a permit"
    })
  } else if(req.query['testmode']=='y') { // use sample data for permit
    req.session.data = sample.permit
    res.render(folder + '/check/task-list',{
      "formAction":"/"+ folder + "/check/check-answers",
      "chosenPermitID":sample.permit['chosenPermitID'],
      "permit":sample.permit
    })
  } else if(req.query['return']=='y') { // from return or screening email
    res.render(folder + '/check/task-list',{
      "formAction":"/"+ folder + "/check/check-answers"
    })
  } else {
    // save chosen Permit ID in session
    // no form entries to add to session
    res.render(folder + '/check/task-list',{
      "formAction":"/"+ folder + "/check/check-answers",
      "chosenPermitID":req.query['chosenPermitID']
    })
  }
})



// Task List

router.post('/check/task-list', function (req, res) {
    res.render(folder + '/check/task-list',{
       "chosenPermitID":req.body['chosenPermitID']
    })
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

// Before you begin ===========================================================

router.post('/returncode/before-you-begin', function (req, res) {
  res.render(folder + '/returncode/before-you-begin',{
    "formAction":"/"+ folder + "/selectpermit/permit-category"
  })
})

router.get('/returncode/continue-application', function (req, res) {
  res.render(folder + '/returncode/continue-application',{
    "formAction":"/"+ folder + "/check/overview"
  })
})

router.get('/returncode/email-code', function (req, res) {
  res.render(folder + '/returncode/email-code',{
    "rtnCode":req.query["rtnCode"]
  })
})

// Download ==============================================================
router.get('/bespoke/download-forms', function (req, res) {
  res.render(folder + '/bespoke/download-forms',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

// Call us for costs ==============================================================
router.get('/bespoke/give-cost-and-time', function (req, res) {
  res.render(folder + '/bespoke/give-cost-and-time',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

// What you need to apply ==============================================================
router.get('/selectpermit/what-need-to-apply', function (req, res) {
  res.render(folder + '/selectpermit/what-need-to-apply',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

// Pre-app ===================================================================

router.get('/preapp/preapp-discussion', function (req, res) {
  res.render(folder + '/preapp/preapp-discussion',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})


// Location check
router.post('/contact/contact-details', function (req, res) {
  if(req.session.data['locationCheck']=="Yes"){
      res.render(folder + '/contact/contact-details',{
          "formAction":"/"+ folder + "/screening/check-your-answers"
      })
  } else {
  res.render(folder + '/contact/contact-details',{
      "formAction":"/"+ folder + "/check/task-list"
   })
  }
})





// EWC waste codes upload =====================================================

router.get('/bespoke/waste-codes', function (req, res) {
  res.render(folder + '/bespoke/waste-codes',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.post('/bespoke/waste-codes', function (req, res) {
  res.render(folder + '/bespoke/waste-codes',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})




// Management system ==========================================================

router.get('/evidence/management-system', function (req, res) {
  res.render(folder + '/evidence/management-system',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})


// Operator ===================================================================

// Add new page site/reason. Link from task-list will be a get
//router.get('/operator/reason', function (req, res) {
//  res.render(folder + '/operator/reason',{
//      "formAction":"/"+ folder + "/operator/site-operator",
//      "permit":req.session.permit // always send permit object to page
//  })
//})


router.get('/operator/company/company-name', function (req, res) {
  res.render(folder + '/operator/company/company-name',{
      "formAction":"/"+ folder + "/operator/company/check-company-details"
  })
})


router.get('/bespoke/waste-operation', function (req, res) {
  res.render(folder + '/bespoke/waste-operation',{
      "formAction":"/"+ folder + "/bespoke/treatment-capacity"
  })
})



router.get('/bespoke/treatment-capacity', function (req, res) {
  res.render(folder + '/bespoke/treatment-capacity',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/bespoke/waste-stored', function (req, res) {
  res.render(folder + '/bespoke/waste-stored',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/operator/ll-partnership/limited-liability-partnership', function (req, res) {
  res.render(folder + '/operator/ll-partnership/limited-liability-partnership',{
      "formAction":"/"+ folder + "/operator/ll-partnership/check-llp-details"
  })
})

router.get('/operator/partnerships/partner1', function (req, res) {
  res.render(folder + '/operator/partnerships/partner1',{
      "formAction":"/"+ folder + "/operator/partnerships/postcode"
  })
})

router.post('/operator/partnerships/postcode', function (req, res) {
  res.render(folder + '/operator/partnerships/postcode',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})



/* limited company API PAGE ====================== */
router.post('/operator/company/check-company-details', function (req, res) {
    request({
        url: 'https://api.companieshouse.gov.uk/search/companies', //URL to hit
        qs: { q:req.body.companyRegNum, items_per_page:99 }, //Query string data
        method: 'GET',
        auth: {'username':process.env.COMP_HOUSE_API_KEY,'password':''},
    }, function(error, response, body){
        if(error) {
            console.log(error)
        } else {
            //console.log(response.statusCode)
            //console.log("=============================")
            //console.log(body)
            //console.log("=============================")
            var companyJSON = JSON.parse(body)
            var company = companyJSON.items[0]
            res.render(folder + '/operator/company/check-company-details',{
                "formAction":"/"+ folder + "/operator/company/go-to-check-officers",
                "company":company,
                "searchTerm":req.body.companyRegNum,
                "numberResults":companyJSON.total_results
            })
        }
    })
})
/* limited liability partnership API PAGE ====================== */

router.post('/operator/ll-partnership/check-llp-details', function (req, res) {
    request({
        url: 'https://api.companieshouse.gov.uk/search/companies', //URL to hit
        qs: { q:req.body.companyRegNum, items_per_page:99 }, //Query string data
        method: 'GET',
        auth: {'username':process.env.COMP_HOUSE_API_KEY,'password':''},
    }, function(error, response, body){
        if(error) {
            console.log(error)
        } else {
            //console.log(response.statusCode)
            //console.log("=============================")
            //console.log(body)
            //console.log("=============================")
            var companyJSON = JSON.parse(body)
            var company = companyJSON.items[0]
            res.render(folder + '/operator/ll-partnership/check-llp-details',{
                "formAction":"/"+ folder + "/operator/ll-partnership/go-to-check-officers",
                "company":company,
                "searchTerm":req.body.companyRegNum,
                "numberResults":companyJSON.total_results
            })
        }
    })
})

// route for link back from company api search results
router.get('/operator/company/company-name', function (req, res) {
  res.render(folder + '/operator/company/company-name',{
      "formAction":"/"+ folder + "/operator/company/go-to-check-officers"
  })
})


/* Company address - NOT USED IN MVP ====================== */

router.post('/operator/company/company-addresses', function (req, res) {
  res.render(folder + '/operator/company/company-addresses',{
      "formAction":"/"+ folder + "/operator/company/go-to-check-officers"
  })
})

/* go-to-check-officers is not a page ====================== */

router.post('/operator/company/company-secretary', function (req, res) {
  res.render(folder + '/operator/company/company-secretary',{
      "formAction":"/"+ folder + "/operator/company/go-to-check-officers"
  })
})

// auto-submitting pass-through page to ensure check officers page is posted
router.post('/operator/company/go-to-check-officers', function (req, res) {
  res.render(folder + '/operator/company/go-to-check-officers',{
      "formAction":"/"+ folder + "/operator/company/check-officers"
  })
})

// auto-submitting pass-through page to ensure check officers page is posted
router.post('/operator/ll-partnership/go-to-check-officers', function (req, res) {
  res.render(folder + '/operator/ll-partnership/go-to-check-officers',{
      "formAction":"/"+ folder + "/operator/ll-partnership/check-officers"
  })
})


/* limited company OFFICERS ====================== */

router.post('/operator/company/check-officers', function (req, res) {

    request({
        url: 'https://api.companieshouse.gov.uk/company/'+req.session.data['companyNumber']+'/officers', //URL to hit
        qs: { items_per_page:99 }, //Query string data
        method: 'GET',
        auth: {'username':process.env.COMP_HOUSE_API_KEY,'password':''},
    }, function(error, response, body){
        if(error) {
            console.log(error)
        } else {
            //console.log(response.statusCode)
            //console.log("=============================")
            //console.log(body)
            //console.log("=============================")
            var officersJSON = JSON.parse(body)
            var officers = officersJSON.items
            res.render(folder + '/operator/company/check-officers',{
                "officers":officers,
                "searchTerm":req.body.companyRegNum,
                "numberResults":officersJSON.total_results,
                "resigned_count":officersJSON.resigned_count,
                "total_results":officersJSON.total_results,
                "active_count":officersJSON.active_count,
                "formAction":"/"+ folder + "/evidence/declare-offences"
            })
        }
    })
})

/* limited liability partnership OFFICERS ====================== */

router.post('/operator/ll-partnership/check-officers', function (req, res) {

    request({
        url: 'https://api.companieshouse.gov.uk/company/'+req.session.data['companyNumber']+'/officers', //URL to hit
        qs: { items_per_page:99 }, //Query string data
        method: 'GET',
        auth: {'username':process.env.COMP_HOUSE_API_KEY,'password':''},
    }, function(error, response, body){
        if(error) {
            console.log(error)
        } else {
            //console.log(response.statusCode)
            //console.log("=============================")
            //console.log(body)
            //console.log("=============================")
            var officersJSON = JSON.parse(body)
            var officers = officersJSON.items
            res.render(folder + '/operator/ll-partnership/check-officers',{
                "officers":officers,
                "searchTerm":req.body.companyRegNum,
                "numberResults":officersJSON.total_results,
                "resigned_count":officersJSON.resigned_count,
                "total_results":officersJSON.total_results,
                "active_count":officersJSON.active_count,
                "formAction":"/"+ folder + "/evidence/declare-offences"
            })
        }
    })
})

router.post('/operator/ll-partnership/officer-email', function (req, res) {

    request({
        url: 'https://api.companieshouse.gov.uk/company/'+req.session.data['companyNumber']+'/officers', //URL to hit
        qs: { items_per_page:99 }, //Query string data
        method: 'GET',
        auth: {'username':process.env.COMP_HOUSE_API_KEY,'password':''},
    }, function(error, response, body){
        if(error) {
            console.log(error)
        } else {
            //console.log(response.statusCode)
            //console.log("=============================")
            //console.log(body)
            //console.log("=============================")
            var officersJSON = JSON.parse(body)
            var officers = officersJSON.items
            res.render(folder + '/operator/ll-partnership/officer-email',{
                "officers":officers,
                "searchTerm":req.body.companyRegNum,
                "numberResults":officersJSON.total_results,
                "resigned_count":officersJSON.resigned_count,
                "total_results":officersJSON.total_results,
                "active_count":officersJSON.active_count,
                "formAction":"/"+ folder + "/evidence/declare-offences"
            })
        }
    })
})


router.get('/operator/company/check-officers', function (req, res) {
  res.render(folder + '/operator/company/check-officers',{
      "formAction":"/"+ folder + "/operator/company/check-officers"
  })
})



/* individual */

router.post('/operator/individual/postcode', function (req, res) {
  res.render(folder + '/operator/individual/postcode',{
      "formAction":"/"+ folder + "/operator/individual/address"
  })
})

router.post('/operator/individual/address', function (req, res) {
  res.render(folder + '/operator/individual/address',{
      "formAction":"/"+ folder + "/operator/individual/check-individual-details"
  })
})

// Manual address is a link - so a GET
router.get('/operator/individual/address-manual', function (req, res) {
  res.render(folder + '/operator/individual/address-manual',{
      "formAction":"/"+ folder + "/operator/individual/check-individual-details"
  })
})

router.post('/operator/individual/check-individual-details', function (req, res) {
  res.render(folder + '/operator/individual/check-individual-details',{
      "formAction":"/"+ folder + "/evidence/declare-offences"
  })
})

/* offences */

router.post('/evidence/declare-offences', function (req, res) {
  res.render(folder + '/evidence/declare-offences',{
      "formAction":"/"+ folder + "/evidence/bankruptcy-insolvency" // previously /evidence/offencescheck
  })
})

// Relevant offences & Bankruptcy insolvency ====================

router.get('/evidence/declare-offences', function (req, res) {
  res.render(folder + '/evidence/declare-offences',{
      "formAction":"/"+ folder + "/evidence/bankruptcy-insolvency" // previously /evidence/offencescheck
  })
})

// This is not a real page, just a URL for the route
router.post('/evidence/offencescheck', function (req, res) {
  if(req.body['offences']=="yes"){ // think you need square bracket for radios
    // show details page
      res.render(folder + '/evidence/details-of-offence',{
          "formAction":"/"+ folder + "/evidence/bankruptcy-insolvency"
      })
  } else {
  res.render(folder + '/evidence/bankruptcy-insolvency',{
      "formAction":"/"+ folder + "/check/task-list"
   })
  }
})

router.post('/evidence/bankruptcy-insolvency', function (req, res) {
  res.render(folder + '/evidence/bankruptcy-insolvency',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})

router.get('/evidence/bankruptcy-insolvency', function (req, res) {
  res.render(folder + '/evidence/bankruptcy-insolvency',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})





// Special cases ==============================================================

router.get('/check-special-cases', function (req, res) {
  var nextPage =  "/check/task-list" // the next page after the special case pages with slash

  // check if there is a special case for this permit
  if(req.session.data['permitID'] == "SR-2009-4"){
    res.render(folder + '/specialcases/sr-2009-4',{
        "formAction":"/"+ folder + nextPage
    })
  } else if (req.session.data['permitID'] == "SR-2010-2") {
    res.render(folder + '/specialcases/sr-2010-2_3',{
        "formAction":"/"+ folder + nextPage
    })
  } else if (req.session.data['permitID'] == "SR-2010-3") {
    res.render(folder + '/specialcases/sr-2010-2_3',{
        "formAction":"/"+ folder + nextPage
    })
  } else if (req.session.data['permitID'] == "SR-2014-2") {
    res.render(folder + '/specialcases/sr-2014-2',{
        "formAction":"/"+ folder + nextPage
    })
  } else if (req.session.data['permitID'] == "SR-2015-13") {
    res.render(folder + '/specialcases/sr-2015-17_18',{
        // send to a page for routes
        "formAction":"/"+ folder + "/specialcases/check-sr-2015-17_18"
    })
  } else if (req.session.data['permitID'] == "SR-2015-17") {
    res.render(folder + '/specialcases/sr-2015-17_18',{
        // send to a page for routes
        "formAction":"/"+ folder + "/specialcases/check-sr-2015-17_18"
    })
  } else if (req.session.data['permitID'] == "SR-2015-18") {
    res.render(folder + '/specialcases/sr-2015-17_18',{
        // send to a page for routes
        "formAction":"/"+ folder + "/specialcases/check-sr-2015-17_18"
    })
  } else if (req.session.data['permitID'] == "SR-2015-39") {
    res.render(folder + '/specialcases/sr-2015-39',{
        "formAction":"/"+ folder + nextPage
    })
  } else { // NO SPECIAL CASES
    res.redirect('/'+folder+'/check/overview')
  }
})

// Mining waste plan for 2009-8 =========================================================

router.get('/specialcases/2009-8/sr-2009-8', function (req, res) {
  res.render(folder + '/specialcases/2009-8/sr-2009-8',{
      "formAction":"/"+ folder + "/check/task-list"
  })
})


// Vehicle storage drainage =========================================================

// This is not a real page, just a URL for the route
router.post('/specialcases/check-sr-2015-17_18', function (req, res) {
  if(req.body['drainage']=="a water body"){ // think you need square bracket for radios
    // show Contact us page
      res.render(folder + '/specialcases/sr-2015-17_18-contact-us',{
      })
  } else if(req.session.data['permitID'] == "SR-2015-13" && req.body['drainage']=="an interceptor"){ // think you need square bracket for radios
    // show Contact us page
      res.render(folder + '/specialcases/sr-2015-17_18-contact-us',{
      })
  } else {
   res.render(folder + '/check/task-list',{
    })
  }
})

// Errors ===================================================================

router.get('/error/wrong-company-details', function (req, res) {
    res.render(folder + '/error/index',{
        "errorText":"If the company details are not correct you can't apply online. Please contact us."
    })
})

// Permit search ===================================================================

router.get('/search-permit/index', function (req, res) {
    res.render(folder + '/search-permit/index',{
      "formAction":"/"+ folder + "/search-permit/index"
    })
})

router.post('/search-permit/index', function (req, res) {
    res.render(folder + '/search-permit/index',{
      "formAction":"/"+ folder + "/search-permit/index",
      "searchTerm":req.body.searchTerm
    })
})

router.get('/search-permit/sr-permits', function (req, res) {
    res.render(folder + '/search-permit/sr-permits',{
      "formAction":"/"+ folder + "/search-permit/sr-permits"
    })
})

router.post('/search-permit/sr-permits', function (req, res) {
    res.render(folder + '/search-permit/sr-permits',{
      "formAction":"/"+ folder + "/search-permit/sr-permits",
      "searchTerm":req.body.searchTerm
    })
})



//var wc = require('which-country');

// England lat long check
router.get('/site/grid-reference-eng', function (req, res) {
  res.render(folder + '/site/grid-reference-eng',{
     "formAction":"/"+ folder + "/site/grid-reference-eng"
  })
})
router.post('/site/grid-reference-eng', function (req, res) {
  var lat = req.body['lat']
  var lng = req.body['lng']
  var siteGridRef = req.body['siteGridRef']
  var country="NOT SET"
  country = wc([lng, lat])
  if(country==null) country="NOT-ENG"
  console.log('Country started')
  console.log(country)
  res.render(folder + '/site/grid-reference-eng',{
     "formAction":"/"+ folder + "/site/grid-reference-eng",
     "country": country,
     "siteGridRef":siteGridRef
  })
})




// Screening test ####################################################

router.get('/testscreen/index', function (req, res) {
  res.render(folder + '/testscreen/index',{
     "formAction":"/"+ folder + "/testscreen/choose-permit"
  })
})

router.post('/testscreen/choose-permit', function (req, res) {
  res.render(folder + '/testscreen/choose-permit',{
     "formAction":"/"+ folder + "/testscreen/grid-reference"
  })
})

router.post('/testscreen/grid-reference', function (req, res) {
  res.render(folder + '/testscreen/grid-reference',{
     "formAction":"/"+ folder + "/testscreen/check-map"
  })
})


// TECHNICAL MANGER DETAILS UPLOAD ========================================================
router.all('/upload-tech-manager-details', function (req, res) {
  var path="/upload-tech-manager-details"
  var title="Give details for all technically competent managers"
  var fileName="TechManDetails"
  var guidanceTop="tcmdetailstop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX or ODT"
  
  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']
    if (req.session.data[fileName+'1']=="") delete req.session.data[fileName+'1']
    if (req.session.data[fileName+'2']=="") delete req.session.data[fileName+'2']
    if (req.session.data[fileName+'3']=="") delete req.session.data[fileName+'3']
    // Back to the task list
    res.render(folder + "/check/task-list",{
          "formAction":"/"+ folder + "/check/check-answers"
    })
  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})


// WASTE RECOVERY PLAN UPLOAD ========================================================
router.all('/upload-waste-recovery-plan', function (req, res) {
  var path="/upload-waste-recovery-plan"
  var title="Upload the waste recovery plan"
  var fileName="WasteRecoveryPlan"
  var guidanceTop="wasterecoveryplantop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX or JPG"
  
  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']
    if (req.session.data[fileName+'1']=="") delete req.session.data[fileName+'1']
    if (req.session.data[fileName+'2']=="") delete req.session.data[fileName+'2']
    if (req.session.data[fileName+'3']=="") delete req.session.data[fileName+'3']
    // Back to the task list
    res.render(folder + "/check/task-list",{
          "formAction":"/"+ folder + "/check/check-answers"
    })
  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})



// DUST MANAGEMENT PLAN UPLOAD ========================================================
router.all('/upload-dust-management-plan', function (req, res) {
  var path="/upload-dust-management-plan"
  var title="Upload the dust management plan"
  var fileName="DustPlan"
  var guidanceTop="dustplantop"
  var guidanceBot=""
  var fileTypes="PDF, DOC, DOCX or JPG"
  
  if ( req.session.data['dontUploadOtherFile']=="yes" ){ // show task list
    delete req.session.data['dontUploadOtherFile']
    if (req.session.data[fileName+'1']=="") delete req.session.data[fileName+'1']
    if (req.session.data[fileName+'2']=="") delete req.session.data[fileName+'2']
    if (req.session.data[fileName+'3']=="") delete req.session.data[fileName+'3']
    // Back to the task list
    res.render(folder + "/check/task-list",{
          "formAction":"/"+ folder + "/check/check-answers"
    })
  } else {  // show upload page
    res.render(folder + '/upload/upload-file',{"title":title,"fileName":fileName,"guidanceTop":guidanceTop,"guidanceBot":guidanceBot,"formAction":"/"+ folder + path,"fileTypes":fileTypes})
  }
})




// Send permit data in session to every page ==================================
router.all('*', function (req, res, next) {
  res.locals.permit=res.locals.data
  next()
})


module.exports = router
