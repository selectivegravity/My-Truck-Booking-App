public with sharing class gettruckbookings {
    @AuraEnabled(cacheable=true)
    public static List<Truck_Booking__c> gettruckbookinglist() {
        return [SELECT Id, Name, Customer_unique_id__c ,Truck__r.Name,Total_C__c,Mode_of_payment__c,Booking_Status__c
         FROM Truck_Booking__c Order By Name asc];
    }
    @AuraEnabled
    public static List<Truck_Booking__c> imperativetruckbookinglist() {
        return [SELECT Id, Name, Customer_unique_id__c ,Truck__r.Name,Truck_Driver__r.Name,Total_C__c,Mode_of_payment__c,Booking_Status__c
         FROM Truck_Booking__c Order By Name asc];
    }
}
