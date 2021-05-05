import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugifyService {
  slugify(value: string): string {
    return slugify(value, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi',
    });
  }
}
