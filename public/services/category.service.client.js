/**
 * 
 */

(function () {
    angular
        .module("giveForCause")
        .factory("CategoryService", CategoryService);

    function CategoryService($http) {
        var api = {
            createCategory: createCategory,
            findCategoryById: findCategoryById,
            updateCategory: updateCategory,
            getAllCategories: getAllCategories,
            deleteCategory: deleteCategory,
            getAllCauses: getAllCauses,
            addCause: addCause,
            updateCause:updateCause,
            deleteCause:deleteCause
        };
        
        return api;
        function deleteCause(data){
        	return $http.delete("http://localhost:8080/WhyThisFinalProject/rest/controller/delete/cause/"+data.causeId);
        }
        function updateCause(data){
        	return $http.put("http://localhost:8080/WhyThisFinalProject/rest/controller/update/cause",data)
        }
        function addCause(data){
        	return $http.post("http://localhost:8080/WhyThisFinalProject/rest/controller/add/cause",data);
        }
        function deleteCategory(CategoryId) {
            return $http.delete(APP_CONSTANT.REMOTE_HOST+ CategoryId);
        }
        
        function getAllCategories() {
            return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/categoryList");
        }
        function getAllCauses() {
            return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/causeList");
        }
        function updateCategory(CategoryId, Category) {
            return $http.put(APP_CONSTANT.REMOTE_HOST+ CategoryId, Category);
        }

        function findCategoryById(CategoryId) {
            return $http.get(APP_CONSTANT.REMOTE_HOST+  CategoryId);
        }

        function createCategory(Category) {
            return $http.post(APP_CONSTANT.REMOTE_HOST, Category);
        }
        
     }

})();
        