var DataStore = {};
DataStore.itemIds = [];
DataStore.config = {
    pageSize:10
};
DataStore.pageNumber = 0;


export const StoreService = {

    saveItemIds : function(items) {

        DataStore.itemIds = DataStore.itemIds.concat(items);
    },

    resetDataStore: function(){
        DataStore.itemIds = [];
        DataStore.pageNumber = 0;
    },

    setConfig: function(config){
        DataStore.config = config;
    },

    getNextPage: function(){
        
        //Initial page number

        if(DataStore.pageNumber === 0) {
            DataStore.pageNumber++;
            return DataStore.itemIds.slice(0, (DataStore.config.pageSize * DataStore.pageNumber));
        }
        var initialIndex = DataStore.config.pageSize * DataStore.pageNumber;
        DataStore.pageNumber++;
        var toIndex = DataStore.config.pageSize * DataStore.pageNumber;
        if(toIndex > DataStore.itemIds.length) {
            toIndex = DataStore.itemIds.length;
            return DataStore.itemIds.slice(initialIndex, toIndex)
        }
        return DataStore.itemIds.slice(initialIndex, toIndex);

    }

}