import {CoResourcesInfo} from './co-resources-info.class';
import {CaDataService} from './ca-data.service';
import {CaResponse} from './ca-data.service';
import {Observable} from 'rxjs/Observable';
import {CaUri} from './ca-data.service';
import {CoContentDto} from '../../dto/at/campusonline/core/lib/model/codata/model';
import {CoResources} from '../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';
import {CoLink} from '../../dto/at/campusonline/core/lib/codata/api/link/dto/model';
import {CoRelType} from '../../dto/at/campusonline/core/lib/model/codata/annotation/link/model';

export class CoDataConstants {
    public static get CONTENT_TYPE_GENERIC():string {
        return 'model-generic';
    }

    public static get CONTENT_ROOT_GENERIC():string {
        return 'generic';
    }
}

export class CaDataModel<T extends CoContentDto> {
    public info:CoResourcesInfo<T>;
    public resources:CoResources<T>;
    public response:CaResponse<T>;
    protected restApi:string;
    protected restResource:string;

    /**
     *fetch first time data with included meta, data, -> cache meta data, reuse,
     * on meta is null, fetch with metadata
     * private meta:CoResourceMetaDto
     */

    // TODO on restApi and restResource, get right links for put and delete
    // TODO retrieve server url.
    constructor(private ds:CaDataService<T>) {
        //console.log('CoDataModel: %o', this.info.getContentKeys());
    }

    next():Observable<CaResponse<T>> {
        return this.ds.get(new CaUri(this.restApi, this.restResource)).map((resp:CaResponse<T>) => this.map(resp));
    }

    //get():Observable<CaResponse<T>> ;

    //get(link:CoLink):Observable<CaResponse<T>> ;

    /**
     * Initial load, after response received, set correct Endpoint Information to use in model. (e.g. restApi, restResource,
     * links -> put... delete)
     * @param restApi
     * @param restResource
     * @returns {Observable<R>}
     */
    //get(api:string, resource:string):Observable<CaResponse<T>> ;

    get(link:CoLink, resource:string):Observable<CaResponse<T>> {
        return this.ds.get(new CaUri(link, resource)).map((resp:CaResponse<T>) => this.map(resp));
    }

    post():Observable<CaResponse<T>> {
        return this.ds.post(new CaUri(this.restApi, this.restResource), this.resources).map((resp:CaResponse<T>) => this.map(resp));
    }

    /**
     * take restApi and uri from member -> initially loaded
     * @returns {Observable<R>}
     */
    put():Observable<CaResponse<T>> {
        return this.ds.put(new CaUri(this.restApi, this.restResource), this.resources).map((resp:CaResponse<T>) => this.map(resp));
    }

    /**
     * take restApi and uri from member -> initially loaded
     * @returns {Observable<R>}
     */
    delete():Observable<CaResponse<T>> {
        return this.ds.delete(new CaUri(this.restApi, this.restResource)).map((resp:CaResponse<T>) => this.map(resp));
    }

    private map(resp:CaResponse<T>):any {
        this.response = resp;
        //this.resources = resp.resources;
        this.info = new CoResourcesInfo<T>(resp.resources);

        //console.log('RESPONSE: %o', resp);
        //this.response = resp;
        //this.resources = resp['resource'];
        //console.log(this.resources);
        //this.info = new CoResourcesInfo<T>(resp.resources);
        //return this.response;
    }
}

export class CaLinkFinder {

    constructor(private links:Array<CoLink>) {

    }

    /**
     * Returns array of CoLinks filtered by key
     * @param key the key to search, self defined
     * @returns {Array<CoLink>} filtered links
     */
    get(rel?:CoRelType, key?:string, type?:string):Array<CoLink> {

        let linksToReturn:Array<CoLink>;

        for (let link of this.links) {
            if (rel) {
                if (key && type) {
                    if (link._rel === rel && link._key === key && link._type === type) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                } else if (key) {
                    if (link._rel === rel && link._key === key) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                } else {
                    if (link._rel === rel) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                }
            } else if (key) {
                if (type) {
                    if (link._key === key && link._type === type) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                } else {
                    if (link._key === key) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                }
            } else if (type) {
                if (link._type === type) {
                    this.addLink(linksToReturn, link);
                    continue;
                }
            } else {
                // return all on no parameter
                return this.links;
            }
        }
        return linksToReturn;
    }

    private addLink(linksToReturn, link): void {
        linksToReturn.push(link);
    };
}

export class CaLink implements CoLink {
  _rel:CoRelType;
  _href:string;
  _type:string;
}
