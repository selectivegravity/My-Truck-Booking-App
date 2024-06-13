public with sharing class searchBooking {
    @AuraEnabled
    public static List<Truck_booking__c> search(String s) {
        string items='%'+s+'%';
        // return [select id,Name,input_load__c from Truck_booking__c WHERE Name like :items order by Name];
        return [SELECT Id, Name, Customer_unique_id__c ,Truck__r.Name,Total_C__c,Mode_of_payment__c,Booking_Status__c
         FROM Truck_Booking__c WHERE Name like :items Order By Name asc];
    }
}

