angular.module("app")
  .directive("gridScreen", function($http) {
    return {
      restrict: "E",
      controller: function($scope) {
        this.setColumns = function(cols) {
          $scope.columns = cols;
        };

        this.setEditor  = function(editor) {
          $scope.columns.unshift(editor);
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
        console.log('gridColumn link', attributes.title)
        gridColumnsController.addColumn({title: attributes.title, field: attributes.field});
      }
    };
  })
  .directive("grid", function() {
    return {
      restrict: "E",
      templateUrl: "/examples/angular_grid_abstraction/templates/as_table.html",
      replace: true,
      controller: function($scope) {
        $scope.$on('ready-to-render', function(e, rows, columns) {
          console.log(rows, columns);
          $scope.rows = rows;
          $scope.columns = columns;
        });
      }
    };
  })
  .directive("withInlineEditor", function() {
    return {
      restrict: "A",
      require: "^gridScreen",
      link: function(scope, element, attributes, gridScreenController) {
        gridScreenController.setEditor({title: "Edit", field: ""});
      }
    };
  })
  .directive("editorInitializer", function($compile, $templateCache) {
    return {
      restrict: "E",
      scope: {
        row: "=",
        columns: "="
      },
      replace: true,
      templateUrl: "/examples/angular_grid_abstraction/templates/editor_initializer.html",
      controller: function($scope) {
        $scope.edit = function(row) {
          $scope.$broadcast('edit', row);
        };
      },
      link: function(scope, element, attributes) {
        scope.$on('edit', function(e, row) {
          var editor = $compile($templateCache.get("/examples/angular_grid_abstraction/templates/editor.html")[1])(scope);
          $(editor).insertAfter(element.parents("tr"));
        });
      }
    }
  });
