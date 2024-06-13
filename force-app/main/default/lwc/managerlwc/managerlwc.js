import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Managerlwc extends LightningElement {
    @api boundary;
  @api Truck_Booking__c;
  recordId='';
  isModalOpen=false;
  handleSuccess() {
    this.isModalOpen = false;
    //setTimeout(function(){this.template.querySelector('c-bookinglistlightningrecord').check();},5000)
    this.template.querySelector('c-bookinglistlightningrecord').check();
    this.dispatchEvent(
      new ShowToastEvent({
        title: null,
        message: 'Updated Booking Status Successfully.',
        variant: 'success'
      })
    );
  }
  update(event){
    //console.log(event.detail);
    this.recordId=event.detail
    this.isModalOpen = true;
  }
  closeModal(){
    this.isModalOpen=false;
  }
}