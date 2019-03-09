import { Component, OnInit } from '@angular/core';
import { chain, get, map } from 'lodash';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  rows = [];
  columns = [];
  handlingUnits = [];

  stateTable = {
    handlingUnits: {}
  };

  constructor() {
  }

  ngOnInit() {
    this.fetchFakeData((data) => {
      console.log(data);
      this.handlingUnits = this.prepareData(data);
    });
  }


  prepareData(data: any = []): object[] {

    const handlingColumns = [
      {
        prop: 'pickupAt',
        name: 'Pickup At'
      }, {
        prop: 'deliveryAt',
        name: 'Delivery At'
      }, {
        prop: 'handlingUnit',
        name: 'Handling Unit'
      }, {
        prop: 'count',
        name: 'Count'
      }, {
        prop: 'weight',
        name: 'Weight'
      }, {
        prop: 'volume',
        name: 'Volume'
      }, {
        prop: 'length',
        name: 'Length'
      }, {
        prop: 'width',
        name: 'Width'
      }, {
        prop: 'height',
        name: 'Height'
      }, {
        prop: 'density',
        name: 'Density'
      }
    ];
    const {stopItemHandlingDetailAssociation = []} = data;

    return stopItemHandlingDetailAssociation.map((handlingItem) => ({
      pickupAt: get(handlingItem, 'pickupAtSeq'),
      deliveryAt: get(handlingItem, 'deliveryAtSeq'),
      handlingUnit: get(handlingItem, 'itemHandlingDetail.itemHandlingTypeCode'),
      count: get(handlingItem, 'itemHandlingDetail.itemHandlingTypeQuantity'),
      weight: get(handlingItem, 'itemHandlingDetail.itemHandlingUnitWeight'),
      volume: get(handlingItem, 'itemHandlingDetail.itemHandlingUnitVolume'),
      length: get(handlingItem, 'itemHandlingDetail.itemHandlingUnitLength'),
      width: get(handlingItem, 'itemHandlingDetail.itemWidth'),
      height: get(handlingItem, 'itemHandlingDetail.itemHeight'),
      density: get(handlingItem, 'itemHandlingDetail.itemHandlingUnitLength'),
      stopItems: get(handlingItem, 'itemHandlingDetail.stopItems')
    })).map(({stopItems = null, ...row}) => ({
      rows: [row],
      stopItems: stopItems ? ({
        rows: stopItems.map((item) => ({
          description: get(item, 'itemDescription'),
          reference: get(item, 'stopItemReferenceNumberAssociations'),
          referenceType: get(item, 'stopReferenceNumber.referenceNumberTypeCode'),
          packageType: get(item, 'packagingUnitTypeCode'),
          count: get(item, 'packagingUnitTypeQuantity'),
          weight: get(item, 'itemWeight'),
          volume: get(item, 'itemVolume'),
          length: get(item, 'itemLength'),
          width: get(item, 'itemWidth'),
          height: get(item, 'itemHeight'),
          density: get(item, 'itemDensity'),
        }))
      }) : null
    }));
  }


  /**
   * FIXME: you should use your fetching service
   */
  fetchFakeData(cb): any {
    const req = new XMLHttpRequest();
    req.open('GET', `https://api.myjson.com/bins/aby3e`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

}
