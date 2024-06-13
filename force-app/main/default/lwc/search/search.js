import { LightningElement,wire } from 'lwc';
import search from '@salesforce/apex/searchBooking.search';
import PROFILE_NAME_FIELD from '@salesforce/schema/User.Profile.Name';
import { getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
const pagesize=4;
export default class Search extends LightningElement {
    
    userId = Id;
    startsize=0;
    endsize=pagesize;
    showp=true;
    shown=false;
    wiredResult;
    wiredError;
    res;
    key='';
    p;
    cols;
    @wire(getRecord, { recordId: Id, fields: [PROFILE_NAME_FIELD]}) 
    async userDetails({error, data}) {
        if (data) {
            this.p = data.fields.Profile.displayValue;            
        } else if (error) {
            this.error = error ;
        }
        if (this.p==="Truck customers"){
            this.cols = [
                {
                    label: 'Booking Number',
                    fieldName: 'nameUrl',
                    type: 'url',
                    typeAttributes: {label: { fieldName: 'Name' }, 
                    target: '_blank'}
                },
                {
                    label: 'Customer Id',
                    fieldName: 'Customer_unique_id__c',
                    type: 'text'
                },
                // {
                //     label: 'Truck Name',
                //     fieldName: 'truckname',
                //     type: 'text'
                    
                // },
                {
                    label: 'Total Cost',
                    fieldName: 'Total_C__c',
                    type: 'text'
                },
                {
                    label: 'Mode of Payment',
                    fieldName: 'Mode_of_payment__c',
                    type: 'text'
                },
                {
                    label: 'Booking Status',
                    fieldName: 'Booking_Status__c',
                    type: 'text'
                }
            
            ];
        }
        else{this.cols = [
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
            }
        
        ];
    }
}
    change(event){
        this.key=event.target.value;
        this.startsize=0;    
        this.endsize=pagesize; 
        this.showp=true
        this.getdata();

    }
    connectedCallback(){
        this.getdata();
    }

    onin(){
        this.wiredResult=this.res.slice(this.startsize,this.endsize)
        console.log(this.startsize,this.endsize,this.res.length)
        if (this.endsize>=this.res.length){
            this.shown=true
        }
        else{
            this.shown=false
        }
    }
    async getdata(){
        console.log(PROFILE_NAME_FIELD);
        await search({s:this.key}).then(
            data=>{
                if(this.p==='Truck customers'){
                    let nameUrl;
                let truckname;
                this.res = data.map(row => { 
                nameUrl = `/${row.Id}`;
                // truckname=row.Truck__r.Name;
                // return {...row , nameUrl,truckname}
                return {...row , nameUrl}
            })}
            else{
                let nameUrl;
                let truckname;
                this.res = data.map(row => { 
                nameUrl = `/${row.Id}`;
                truckname=row.Truck__r.Name;
                return {...row , nameUrl,truckname}
            })}
            }
            
        ).catch(error =>{
            this.wiredError=error;
        }
        )
        this.onin();
        
    }
    handleprev(){
        if (this.startsize!==0){
            this.startsize=this.startsize-pagesize
            this.endsize=this.endsize-pagesize
            this.onin();
            this.shown=false
        }
        if (this.startsize<=0){
            this.showp=true
        }
        
    }
    handlenext(){
    if (this.endsize<this.res.length){
        this.startsize=this.startsize+pagesize
        this.endsize=this.endsize+pagesize
        this.onin();
        this.showp=false
    }
    }
}