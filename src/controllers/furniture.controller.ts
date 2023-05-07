import { Controller, Get, HttpStatus, NotFoundException, Param, Res } from '@nestjs/common';
import { Furniture } from '@prisma/client';
import { FurnitureService } from 'src/services/furniture.service';

@Controller('furnitures')
export class FurnitureController {
    constructor(
       private readonly furnitureService: FurnitureService
    ){}
    
    @Get('')
    async getFurnitures(@Res() res){
        const furnitures = await this.furnitureService.getFurnitures();
        
        return res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successfully!",
            data: furnitures
        });
    }

    @Get('/:furnitureId')
    async getProduct(@Res() res, @Param('furnitureId') furnitureId) {
        const furniture = await this.furnitureService.getFurniture(furnitureId);
        
        if (!furniture) return res.status(HttpStatus.NOT_FOUND).json({
            status: 404,
            message: "Product not found",
            data: false
        })
        
        
        return res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successfully!",
            data: furniture
        });
    }
}
