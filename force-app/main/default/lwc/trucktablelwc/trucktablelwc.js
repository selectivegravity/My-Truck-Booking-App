import { LightningElement,wire,track,api } from 'lwc';
import gettrucklist from '@salesforce/apex/gettrucks.gettrucklist';
import { refreshApex } from '@salesforce/apex';
const pagesize=4;
export default class Trucktablelwc extends LightningElement {
    @track columns = [
        {
            label: 'Truck name',
            fieldName: 'nameUrl',
            type: 'url',
            typeAttributes: {label: { fieldName: 'Name' }, 
            target: '_blank'},
            sortable: true
        },
        {
            label: 'Truck Image',
            fieldName: 'Truck_Image__c',
            type: 'image',
            sortable: true
        },
        {
            label: 'Maximum load',
            fieldName: 'maximum_load__c',
            type: 'text',
            sortable: true
        },
        {
            label: 'Availability status',
            fieldName: 'is_available__c',
            type: 'text',
            sortable: true
        }

    ];

    connectedCallback(){
        this.getdata();
    }
    @track error;
    @track trucks = [];

    table;
    draftValues=[];
    
    @api
    check(){
        console.log('abc');
        this.getdata();
        refreshApex(this.trucks);
    }

    getdata(){
        gettrucklist().then(data =>{
            let nameUrl;
            this.trucks = data.map(row => { 
                nameUrl = `/${row.Id}`;
                return {...row , nameUrl} 
            })
            this.error = null;
        }).catch(error =>{
            this.error = error;
            this.trucks = [];
        })
    }

    // @wire(gettrucklist)
    // wiredtrucks(result) {
    //     const { data, error } = result;
    //     this.table=data;
    //     if(data) {
    //         let nameUrl;
    //         this.trucks = data.map(row => { 
    //             nameUrl = `/${row.Id}`;
    //             return {...row , nameUrl} 
    //         })
    //         this.error = null;
    //     }
    //     if(error) {
    //         this.error = error;
    //         this.trucks = [];
    //     }
    // }
}