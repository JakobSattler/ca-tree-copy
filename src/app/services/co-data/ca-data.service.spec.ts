import {CaUri} from './ca-data.service';
import {CaLink} from './co-data.model';
import {CoLink} from '../../dto/at/campusonline/core/lib/codata/api/link/dto/model';
import {CoRelType} from '../../dto/at/campusonline/core/lib/model/codata/annotation/link/model';

describe('# ca-data.service CaUri', () => {

  it('- CaUri init with api', () => {
    // Given
    let uri: string = 'uri';

    // When
    let caUri = new CaUri(uri);

    // Then
    expect(uri).toEqual(caUri.api);
    expect(undefined).toEqual(caUri.link);
  });

  it('- CaUri init with link', () => {
    // Given
    let uri: string = 'uri';
    let coLink: CoLink = new CaLink();
    coLink._rel = CoRelType.self;
    coLink._href = uri;

    // When
    let caUri = new CaUri(coLink);

    // Then
    expect(undefined).toEqual(caUri.api);
    expect(CoRelType.self).toEqual(caUri.link._rel);
    expect('uri').toEqual(caUri.link._href);
  });

  it('- CaUri init with incompatible parameter', () => {
    // When
    expect(() => {
      /* tslint:disable */
      new CaUri('');
      /* tslint:enable */
    }).toThrow();
  });

});
