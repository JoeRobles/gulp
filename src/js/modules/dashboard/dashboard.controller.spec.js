/* jshint -W117, -W030 */
describe.only('DashboardController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.dashboard', bard.fakeToastr);
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');

        controller = $controller('DashboardController');
    });

    it('should be created successfully', function () {
        expect(controller).to.be.defined;
    });
//
//    it('should have title of Dashboard', function () {
//        expect(controller.title).to.equal('Dashboard');
//    });
//
//    it('should have logged "Activated"', function() {
//        expect($log.info.logs).to.match(/Activated/);
//    });
//    
//    it('should exist', function(){
//        expect(controller).to.exist;
//    });
//    
//    it('should have name', function(){
//        expect(controller.name).to.exist;
//    });
});