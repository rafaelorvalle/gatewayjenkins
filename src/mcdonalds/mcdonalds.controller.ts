import { Controller, Get, Query } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Controller('consulta')
export class ConsultaController {
private client: ClientProxy;
constructor() {
    // Configure o cliente RabbitMQ
    this.client = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
    urls: ['amqp://localhost:5672'], // URL do RabbitMQ
    queue: 'consulta_queue', // Nome da fila
    queueOptions: {
    durable: false, // Durabilidade da fila
    },
    },
    });
    }
    @Get()
 async getConsulta(@Query('id') id: string): 
Promise<Observable<any>> {
 return this.client.send({ cmd: 'get_consulta' }, { id });
 }
}
