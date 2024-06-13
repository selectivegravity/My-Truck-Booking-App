public with sharing class gettrucks {
    @AuraEnabled(cacheable=true)
    public static List<Truck__c> gettrucklist() {
        return [SELECT Id, Name, Truck_Image__c ,maximum_load__c,is_available__c,Base_Cost__c,Truck_Manager__r.Name FROM Truck__c Order By Name asc];
    }
}
