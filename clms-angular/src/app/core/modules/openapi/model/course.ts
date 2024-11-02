/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Assignment } from './assignment';
import { User } from './user';


export interface Course { 
    id?: number;
    name?: string;
    description?: string;
    members?: Array<User>;
    assignments?: Array<Assignment>;
}

