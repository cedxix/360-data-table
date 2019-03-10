import { Component, OnInit } from '@angular/core';
import { chain, get, map, cloneDeep } from 'lodash';
import { DENSITY_UNITS, LENGTH_UNITS, VOLUME_UNITS, WEIGHT_UNITS } from './../unit-cell/constants/units-constants';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  handlingUnits = [];

  mesuresUnitsTypes = {
    density: DENSITY_UNITS,
    length: LENGTH_UNITS,
    volume: VOLUME_UNITS,
    weight: WEIGHT_UNITS
  };

  referenceTypes = [
    {
      label: 'PO NBR',
      value: 'PO NBR'
    }, {
      label: 'I DONT KNOW NBR',
      value: 'IDK'
    }
  ];
  packageTypes = [
    {
      label: 'Boxes',
      value: 'Box'
    }, {
      label: 'Envelop',
      value: 'envelop'
    }
  ];

  constructor() {
  }

  ngOnInit() {
    this.fetchFakeData((data) => {
      this.handlingUnits = this.prepareData(data);
    });
  }

  onDuplicateHandlingUnit(handlingUnitIndex, handlingUnit) {
    // FIXME: Implement your duplicate API logic here
    console.log('you are duplicating', handlingUnit);
    this.handlingUnits.push(cloneDeep(handlingUnit));
  }

  onAddHandlingUnit(handlingUnitIndex, rowIndex, stopItemId) {
    // FIXME: Implement your add API logic here
    console.log('you are adding', handlingUnitIndex, rowIndex, stopItemId);
    const stopItemsRows = cloneDeep(this.handlingUnits[handlingUnitIndex].stopItems.rows);
    this.handlingUnits[handlingUnitIndex].stopItems.rows = [
      ...stopItemsRows, ...stopItemsRows[rowIndex]
    ];
    console.log(this.handlingUnits);
  }

  onRemoveHandlingUnit(handlingUnitIndex, rowIndex, stopItemId) {
    // FIXME: Implement your remove API logic here
    console.log('you are removing', handlingUnitIndex, rowIndex, stopItemId);
    get(this.handlingUnits, `${handlingUnitIndex}.stopItems.rows`).splice(rowIndex, 1);
  }

  onUpdateHandlingUnitValue(evt, column, handlingUnitIndex: number, rowIndex: number) {
    // FIXME: implement your API logic for update here
    const newValue = get(evt, 'target.value', evt);
    const stopItemsRow = get(this.handlingUnits, `${handlingUnitIndex}.stopItems.rows.${rowIndex}`);
    console.log(newValue, stopItemsRow, column, handlingUnitIndex, rowIndex);
  }

  onUpdateStopItemValue(evt, column, handlingUnitIndex: number, rowIndex: number) {
    // FIXME: implement your API logic for update here
    const newValue = get(evt, 'target.value', evt);
    const stopItemsRow = get(this.handlingUnits, `${handlingUnitIndex}.stopItems.rows.${rowIndex}`);
    console.log(newValue, stopItemsRow, column, handlingUnitIndex, rowIndex);
  }


  prepareData(data: any = []): object[] {
    const {stopItemHandlingDetailAssociation = []} = data;

    return stopItemHandlingDetailAssociation.map((handlingItem) => ({
      pickupAt: [
        {
          label: get(handlingItem, 'pickupAtSeq'),
          value: get(handlingItem, 'pickupAtSeqId')
        }, {
          label: '45',
          value: 45
        }
      ],
      deliveryAt: [
        {
          label: get(handlingItem, 'deliveryAtSeq'),
          value: get(handlingItem, 'deliveryAtSeqId')
        }, {
          label: '45',
          value: 45
        }
      ],
      handlingUnit: get(handlingItem, 'itemHandlingDetail.itemHandlingTypeCode'),
      count: get(handlingItem, 'itemHandlingDetail.itemHandlingTypeQuantity'),
      weight: {
        label: get(handlingItem, 'itemHandlingDetail.itemHandlingUnitWeight'),
        unit: get(handlingItem, 'itemHandlingDetail.unitOfWeightMeasurementCode')
      },
      volume: {
        label: get(handlingItem, 'itemHandlingDetail.itemHandlingUnitVolume'),
        unit: get(handlingItem, 'itemHandlingDetail.unitOfVolumeMeasurementCode')
      },
      length: {
        label: get(handlingItem, 'itemHandlingDetail.itemHandlingUnitLength'),
        unit: get(handlingItem, 'itemHandlingDetail.unitOfLengthMeasurementCode')
      },
      width: get(handlingItem, 'itemHandlingDetail.itemWidth'),
      height: get(handlingItem, 'itemHandlingDetail.itemHeight'),
      density: {
        label: get(handlingItem, 'itemHandlingDetail.itemHandlingUnitLength'),
        unit: get(handlingItem, 'itemHandlingDetail.unitOfDensityMeasurementCode')
      },
      stopItems: get(handlingItem, 'itemHandlingDetail.stopItems')
    })).map(({stopItems = null, ...row}) => ({
      rows: [row],
      stopItems: stopItems ? ({
        rows: stopItems.map((item) => ({
          id: get(item, 'stopItemID'),
          description: get(item, 'itemDescription'),
          reference: get(item, 'stopItemReferenceNumberAssociations.0.stopReferenceNumber.referenceNumberValue'),
          referenceType: get(item, 'stopItemReferenceNumberAssociations.0.stopReferenceNumber.referenceNumberTypeCode'),
          packageType: get(item, 'packagingUnitTypeCode'),
          count: get(item, 'packagingUnitTypeQuantity'),
          weight: {
            label: get(item, 'itemWeight'),
            unit: get(item, 'unitOfWeightMeasurementCode')
          },
          volume: {
            label: get(item, 'itemVolume'),
            unit: get(item, 'unitOfVolumeMeasurementCode')
          },
          length: {
            label: get(item, 'itemLength'),
            unit: get(item, 'unitOfLengthMeasurementCode')
          },
          width: get(item, 'itemWidth'),
          height: get(item, 'itemHeight'),
          density: {
            label: get(item, 'itemDensity'),
            unit: get(item, 'unitOfDensityMeasurementCode')
          }
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
