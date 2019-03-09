import { Component, OnInit } from '@angular/core';
import { chain, get, map } from 'lodash';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  handlingUnits = [];

  weightUnits = [
    {
      value: 'Pounds',
      label: 'lb'
    }, {
      value: 'Kilograms',
      label: 'kg'
    }
  ];
  volumeUnits = [
    {
      value: 'Cubic CM',
      label: 'cm3'
    }, {
      value: 'Cubic Foot',
      label: 'ft3'
    }
  ];
  lengthUnits = [
    {
      value: 'Inches',
      label: 'In'
    }
  ];
  densityUnits = [
    {
      value: 'GM/CC',
      label: 'gm/cc'
    }
  ];

  constructor() {
  }

  ngOnInit() {
    this.fetchFakeData((data) => {
      console.log(data);
      this.handlingUnits = this.prepareData(data);
    });
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
          description: get(item, 'itemDescription'),
          reference: get(item, 'stopItemReferenceNumberAssociations'),
          referenceType: {
            label: get(item, 'stopReferenceNumber.referenceNumberTypeCode'),
            value: get(item, 'stopReferenceNumber.referenceNumberTypeCode')
          },
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
