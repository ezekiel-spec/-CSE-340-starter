// Route to deliver a specific inventory item detail view
router.get("/detail/:invId", invCont.getVehicleDetail);
// Route to trigger a 500 error
router.get("/trigger-error", invCont.triggerError);