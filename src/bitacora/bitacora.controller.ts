import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { Request, Response} from 'express';

@Controller('bitacora')
export class BitacoraController {
    constructor(
        private readonly bitacoraService: BitacoraService
    ){}

    @Post()
    async findAll():Promise<any[]>{
        return await this.bitacoraService.findAll();
    }
}
