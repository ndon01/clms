/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Role } from './role';
import { Permission } from './permission';


export interface UserProjection { 
    id?: number;
    username?: string;
    roles?: Set<Role>;
    permissions?: Set<Permission>;
}

