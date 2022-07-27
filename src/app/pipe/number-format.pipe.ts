import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  pure: false,
})
export class NumberFormatPipe implements PipeTransform {
  transform(
    value: number | string,
    minFractionDigits: number = 0,
    maxFractionDigits: number = 2,
    locale: string = 'en'
  ): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    }).format(Number(value));
  }
}
