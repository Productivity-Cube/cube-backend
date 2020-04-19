import { Connection, createConnection, useContainer } from 'typeorm'
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions'
import { Container, Inject, Service } from 'typedi'
import 'reflect-metadata'

@Service()
export class Database {

}
