angular.module("app")
  .directive("gridScreen", function($http) {
    return {
      restrict: "E",
      controller: function($scope) {
        this.setColumns = function(cols) {
          $scope.columns = cols;
        };
      },
      link: function(scope, element, attributes) {
        $http.get(attributes.resource).success(function(response) {
          scope.rows = response.data;
          scope.$broadcast('ready-to-render', scope.rows, scope.columns);
        });
      }
    }
  })
  .directive("gridColumns", function() {
    return {
      restrict: "E",
      require: ['^gridScreen', 'gridColumns'],
      controller: function() {
        var columns = [];
        this.addColumn = function(col) {
          columns.push(col);
        };

        this.getColumns = function() {
          return columns;
        };
      },
      link: function(scope, element, attributes, controllers) {
        var gridScreenController  = controllers[0];
        var gridColumnsController = controllers[1];
        gridScreenController.setColumns(gridColumnsController.getColumns());
      }
    };
  })
  .directive("gridColumn", function() {
    return {
      restrict: "E",
      require: "^gridColumns",
      link: function(scope, element, attributes, gridColumnsController) {
        gridColumnsController.addColumn({title: attributes.title, field: attributes.field});
      }
    };
  })
  .directive("grid", function() {
    return {
      restrict: "E",
      templateUrl: "/examples/angular_grid_abstraction/templates/as_table.html",
      controller: function($scope) {
        $scope.$on('ready-to-render', function(e, rows, columns) {
          $scope.rows = rows;
          $scope.columns = columns;
        });
      }
    };
  });
