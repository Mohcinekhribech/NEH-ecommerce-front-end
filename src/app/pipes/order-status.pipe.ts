import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../core/enums/order-status.enum';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: keyof typeof OrderStatus): string {
    return OrderStatus[value] || value;
  }

}
