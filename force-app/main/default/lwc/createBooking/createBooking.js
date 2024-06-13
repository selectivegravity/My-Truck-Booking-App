import { LightningElement,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import booking_OBJECT from '@salesforce/schema/Truck_Booking__c';   
import load from "@salesforce/schema/Truck_Booking__c.Input_load__c";
import paymentmode from "@salesforce/schema/Truck_Booking__c.Mode_of_payment__c";
import pstate from "@salesforce/schema/Truck_Booking__c.Pickup_State__c";
import pcity from "@salesforce/schema/Truck_Booking__c.Pickup_city__c";
import dstate from "@salesforce/schema/Truck_Booking__c.Drop_State__c";
import dcity from "@salesforce/schema/Truck_Booking__c.Drop_city__c";
import truck from "@salesforce/schema/Truck_Booking__c.Truck__c";
export default class CreateBooking extends LightningElement {
    Object = booking_OBJECT;
    myFields = [truck,load,pstate,pcity,dstate,dcity,paymentmode];


    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen track value as true
        this.isModalOpen = true;
    }
    closeModal(event) {
        // to close modal set isModalOpen track value as false
        this.isModalOpen = false;
    }
    async handleAccountCreated(event) {
        await this.template.querySelector("c-trucktablelwc").check();
        this.isModalOpen = false;
        this.dispatchEvent(
            new ShowToastEvent({
              title: null,
              message: 'Updated Booking Status Successfully.',
              variant: 'success'
            })
          );
    }
}