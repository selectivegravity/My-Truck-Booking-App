import { LightningElement,wire,track,api } from 'lwc';
import gettruckbookinglist from '@salesforce/apex/gettruckbookings.imperativetruckbookinglist';
export default class Bookinglistlightningrecord extends LightningElement {
    recordId='';
    @track columns = [
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
            label: 'Truck Driver',
            fieldName: 'Driver__c',
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
            label: 'Update record',
            name: 'Update_record',
          }
        }

    ];

    @track error;
    @track truckbookings = [];
    @api 
    check(){this.getdata();}
    getdata(){
        //console.log('123');
        gettruckbookinglist().then(
        data=>{
            let nameUrl;
            let truckname;
            let truckdriver;
            this.truckbookings = data.map(row => { 
            nameUrl = `/${row.Id}`;
            truckname=row.Truck__r.Name;
            try {
                truckdriver=row.Truck_Driver__r.Name;
                }
            catch(error){
                truckdriver='Assign Driver';
            }
            return {...row , nameUrl,truckname,truckdriver}
        })}).catch(error=>{
            this.error = error;
            this.truckbookings = [];
        })
    }
    connectedCallback(){
        this.getdata();
    }
    // @wire(gettruckbookinglist)
    // wiredtruckbookings(result) {
    //     const { data, error } = result;
    //     if(data) {
    //         let nameUrl;
    //         let truckname;
    //         this.truckbookings = data.map(row => { 
    //             nameUrl = `/${row.Id}`;
    //             truckname=row.Truck__r.Name;
    //             return {...row , nameUrl,truckname}
    //         })
    //         this.error = null;
    //     }
    //     if(error) {
    //         this.error = error;
    //         this.truckbookings = [];
    //     }
    // }
    handleRowAction(event) {
        // console.log(event.detail.row.Id);
        this.dispatchEvent(new CustomEvent('update', { detail: event.detail.row.Id }));
    }
          
}