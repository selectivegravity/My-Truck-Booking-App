import { LightningElement,wire,track } from 'lwc';
import gettruckbookinglist from '@salesforce/apex/gettruckbookings.gettruckbookinglist';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
//import { decodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import PROFILE_NAME_FIELD from '@salesforce/schema/User.Profile.Name';
import { getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
export default class Truckbookinglist extends NavigationMixin(LightningElement) {
    // @track columns = [
    //     {
    //         label: 'Booking Number',
    //         fieldName: 'nameUrl',
    //         type: 'url',
    //         typeAttributes: {label: { fieldName: 'Name' }, 
    //         target: '_blank'},
    //         sortable: true
    //     },
    //     {
    //         label: 'Customer Id',
    //         fieldName: 'Customer_unique_id__c',
    //         type: 'text',
    //         sortable: true
    //     },
    //     {
    //         label: 'Truck Name',
    //         fieldName: 'truckname',
    //         type: 'text',
    //         sortable: true
            
    //     },
    //     {
    //         label: 'Total Cost',
    //         fieldName: 'Total_C__c',
    //         type: 'text',
    //         sortable: true
    //     },
    //     {
    //         label: 'Mode of Payment',
    //         fieldName: 'Mode_of_payment__c',
    //         type: 'text',
    //         sortable: true
    //     },
    //     {
    //         label: 'Booking Status',
    //         fieldName: 'Booking_Status__c',
    //         type: 'text',
    //         sortable: true
    //     },
    //     {
    //       type: 'button',
    //       initialWidth: 155,
    //       typeAttributes: {
    //         label: 'Create Case',
    //         name: 'Create_Case',
    //       }
    //     }

    // ];

    @track error;
    @track truckbookings = [];
    p;
    cols;
    userId = Id;
    @wire(getRecord, { recordId: Id, fields: [PROFILE_NAME_FIELD]}) 
    async userDetails({error, data}) {
        if (data) {
            this.p = data.fields.Profile.displayValue;            ;
        } else if (error) {
            this.error = error ;
        }
        console.log(this.p);
        if (this.p==="Truck customers"){
            this.cols = [
                {
                    label: 'Booking Number',
                    fieldName: 'nameUrl',
                    type: 'url',
                    typeAttributes: {label: { fieldName: 'Name' }, 
                    target: '_blank'},
                    sortable: true
                },
                {
                    label: 'Customer Id',
                    fieldName: 'Customer_unique_id__c',
                    type: 'text',
                    sortable: true
                },
                // {
                //     label: 'Truck Name',
                //     fieldName: 'truckname',
                //     type: 'text',
                //     sortable: true
                    
                // },
                {
                    label: 'Total Cost',
                    fieldName: 'Total_C__c',
                    type: 'text',
                    sortable: true
                },
                {
                    label: 'Mode of Payment',
                    fieldName: 'Mode_of_payment__c',
                    type: 'text',
                    sortable: true
                },
                {
                    label: 'Booking Status',
                    fieldName: 'Booking_Status__c',
                    type: 'text',
                    sortable: true
                },
                {
                  type: 'button',
                  initialWidth: 155,
                  typeAttributes: {
                    label: 'Create Case',
                    name: 'Create_Case',
                  }
                }
        
            ];
        }
        else{
            this.cols = [
                {
                    label: 'Booking Number',
                    fieldName: 'nameUrl',
                    type: 'url',
                    typeAttributes: {label: { fieldName: 'Name' }, 
                    target: '_blank'},
                    sortable: true
                },
                {
                    label: 'Customer Id',
                    fieldName: 'Customer_unique_id__c',
                    type: 'text',
                    sortable: true
                },
                {
                    label: 'Truck Name',
                    fieldName: 'truckname',
                    type: 'text',
                    sortable: true
                    
                },
                {
                    label: 'Total Cost',
                    fieldName: 'Total_C__c',
                    type: 'text',
                    sortable: true
                },
                {
                    label: 'Mode of Payment',
                    fieldName: 'Mode_of_payment__c',
                    type: 'text',
                    sortable: true
                },
                {
                    label: 'Booking Status',
                    fieldName: 'Booking_Status__c',
                    type: 'text',
                    sortable: true
                },
                {
                  type: 'button',
                  initialWidth: 155,
                  typeAttributes: {
                    label: 'Create Case',
                    name: 'Create_Case',
                  }
                }
        
            ];
        }
    }
    @wire(gettruckbookinglist)
    wiredtruckbookings(result) {
        const { data, error } = result;
         if(data) {
            if(this.p==='Truck customers'){
            console.log('abc');
            let nameUrl;
            //let truckname;
            this.truckbookings = data.map(row => { 
            nameUrl = `/${row.Id}`;
            // truckname=row.Truck__r.Name;
            // return {...row , nameUrl,truckname}
            return {...row , nameUrl}
            })}
        else{
            console.log('abc123');
            let nameUrl;
            let truckname;
            this.truckbookings = data.map(row => { 
            nameUrl = `/${row.Id}`;
            truckname=row.Truck__r.Name;
            return {...row , nameUrl,truckname}
        })}
            this.error = null;
        }
        if(error) {
            this.error = error;
            this.truckbookings = [];
        }
    }
    handleRowAction(event) {
        //console.log(event.detail.row.Name);
        //let bname=JSON.stringify(event.detail.row.Id);
        const defaultValues = encodeDefaultFieldValues({
            Truck_Booking__c:event.detail.row.Id,
            Status:'New',
            Subject:'Customer created case',
            Type:'Truck Booking',
            Origin:'Web'
        });

        //console.log(defaultValues);

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Case',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }
          }
         