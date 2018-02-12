var AddressApp = angular.module('addressApp', ['ngRoute', 'ui.mask', 'ui.gravatar']),
    //public namespace
    //ADD = { "apiUrl":"http://front-end.oudemo.com/api", "apiKey":"12e985d9-ce49-440c-af67-466efbb738e8"};
	ADD = { "apiUrl":"http://localhost:8080/api"};


ADD.dataService = function($http) {

    //delete $http.defaults.headers.common['X-Requested-With'];
    
    this.getAllAddresses = function() {
        return $http({
            method: 'GET',
            url: ADD.apiUrl + '/address/list'
        });
    }

    this.getAddress = function(addressId) {
        return $http({
            method: 'GET',
            url: ADD.apiUrl + '/address/view',
            params: {
                "id": addressId
            }
        });
    }

    this.createAddress = function(address) {
        var data = address,
            params = "";
        params = JSON.stringify(data);

        return $http.post(ADD.apiUrl + '/address/new', params);
    }

    this.updateAddress = function(address) {
        var data = address,
        		params = JSON.stringify(data);
        return $http.post(ADD.apiUrl + '/address/update', params);
    }

    this.deleteAddress = function(addressId) {
        var data = {
                "id": addressId
            },
            params = JSON.stringify(data);
        return $http.post(ADD.apiUrl + '/address/delete/'+addressId);
    }
}

ADD.ListAddressController = function($scope, $location, $route, $filter, dataService) {
    var addressController = this;

    $scope.location = $location;
    //default to filtering by first, last and email
    addressController.searchField = 'ALL';
    addressController.filter = "";
    addressController.sortType = 'lastName';
    addressController.sortReverse = false;

    dataService.getAllAddresses().then(function(response) {
        addressController.addresses = response.data;
        addressController.filteredList = response.data;
        addressController.watchFields($scope);
    });

    addressController.deleteDisabled = function() {
        return $(addressController.addresses).filter(function(index, address) {
            return address.delete == true;
        }).length == 0;
    }

    addressController.deleteSelected = function() {
        var deletionPromises = [];
        $(addressController.addresses).each(function(index, address) {

            if (address.delete) {
                deletionPromises.push(dataService.deleteAddress(address.id));
            }
        });
        //when takes in a variable length argument list - which is why we must use apply
        $.when.apply($, deletionPromises).done(function() {
            $route.reload();
        });
    };
}

ADD.ListAddressController.prototype.watchFields = function($scope) {
    var addressController = this;
    $scope.$watchCollection('[controller.filter, controller.searchField]', function() {

        var searchTxt = $.trim(addressController.filter).toLowerCase();
        switch (addressController.searchField) {
            case 'FIRST':
                filterToApply = function(index, address) {
                    return address.firstName.toLowerCase().indexOf(searchTxt) >= 0;
                };
                break;
            case 'LAST':
                filterToApply = function(index, address) {
                    return address.lastName.toLowerCase().indexOf(searchTxt) >= 0;
                };
                break;
            case 'EMAIL':
                filterToApply = function(index, address) {
                    return address.email.toLowerCase().indexOf(searchTxt) >= 0;
                };
                break;
            default:
                filterToApply = function(index, address) {
                    return address.firstName.toLowerCase().indexOf(searchTxt) >= 0 ||
                        address.lastName.toLowerCase().indexOf(searchTxt) >= 0 ||
                        address.email.toLowerCase().indexOf(searchTxt) >= 0;
                };
        }
        addressController.filteredList = $(addressController.addresses).filter(filterToApply).toArray();
    });
}

ADD.EditAddressController = function($scope, $routeParams, $location, dataService) {
    var editController = this,
        addressId = $routeParams.addressId;

    editController.isReadOnly = false;
    editController.label = "Update";

    dataService.getAddress(addressId).then(function(response) {
        editController.address = response.data;
    });

    editController.cancel = function() {
        $location.path('/');
    };

    editController.save = function() {
        dataService.updateAddress(editController.address).then(function(response) {
            $location.path('/');
        });
    };

    editController.getReadOnly = function() {
        return '';
    }
}

ADD.ViewAddressController = function($scope, $routeParams, $location, dataService) {
    var controller = this,
        addressId = $routeParams.addressId;

    controller.isReadOnly = true;
    controller.label = "View";
    dataService.getAddress(addressId).then(function(response) {
        controller.address = response.data;
    });

    controller.cancel = function() {
        $location.path('/');
    };

    controller.getReadOnly = function() {
        return 'readonly';
    }
}

ADD.NewAddressController = function($scope, $location, dataService) {
    var controller = this;

    controller.label = "Create New";

    controller.cancel = function() {
        $location.path('/');
    };

    controller.save = function() {
        dataService.createAddress(controller.address).then(function(response) {
            $location.path('/');
        });
    }
}

ADD.Router = function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "address-list.html"
        })
        .when('/new', {
            controller: 'NewAddressController as controller',
            templateUrl: 'address-detail.html'
        })
        .when('/edit/:addressId', {
            controller: 'EditAddressController as controller',
            templateUrl: 'address-detail.html'
        })
        .when('/view/:addressId', {
            controller: 'ViewAddressController as controller',
            templateUrl: 'address-detail.html'
        })
}

AddressApp.service('dataService', ADD.dataService);
//register controllers
AddressApp.controller('ListAddressController', ADD.ListAddressController);
AddressApp.controller('EditAddressController', ADD.EditAddressController);
AddressApp.controller('ViewAddressController', ADD.ViewAddressController);
AddressApp.controller('NewAddressController', ADD.NewAddressController);

AddressApp.config(ADD.Router);