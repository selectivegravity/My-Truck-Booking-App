import { LightningElement,wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import booking_OBJECT from '@salesforce/schema/Truck_Booking__c';   
import gettrucklist from '@salesforce/apex/gettrucks.gettrucklist';
import imperativetrucklist from '@salesforce/apex/gettrucks.imperativetrucklist';
export default class MyTruckListLWC extends LightningElement {
    truckId;
    ManagerId;
    Object = booking_OBJECT;
    trucklist;

    @wire (gettrucklist) 
        wiredTruck({error,data}){
        if(data){
            this.trucklist = data;
            console.log(this.trucklist);
        }
        if(error){
            alert(JSON.stringify(error));
        }
    }

    @track isModalOpen = false;
    openModal(event) {
        // to open modal set isModalOpen track value as true
        this.truckId = event.target.value;
        for(let i=0;i<this.trucklist.length;i++){
            if(this.trucklist[i].Id === this.truckId){
                if(this.trucklist[i].Is_Available__c === 'Yes'){
                    this.ManagerId = this.trucklist[i].Truck_Manager__r.Id;
                    this.isModalOpen = true;
                    return;
                }
                else{
                    this.dispatchEvent(
                        new ShowToastEvent({
                          title: 'Truck not available',
                          variant: 'warning'
                        })
                    );
                    return;
                }
            }
        }
        
    }
    closeModal(event) {
        // to close modal set isModalOpen track value as false
        this.isModalOpen = false;
    }
    async handleAccountCreated(event) {
        // await this.template.querySelector("c-trucktablelwc").check();
        this.isModalOpen = false;
        this.dispatchEvent(
            new ShowToastEvent({
              title: null,
              message: 'Booking Created Successfully',
              variant: 'success'
            })
          );
    }
    
    loadfilter;
    handleSearchEvent(event){
        this.loadfilter = event.target.value;
        imperativetrucklist({searchLoad:this.loadfilter}).then(result =>{
            this.trucklist = result;
        }).catch(error =>{
            // this.loadfilter = 0;
        })
    }
}