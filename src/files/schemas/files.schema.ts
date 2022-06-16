import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilesDocument = Files & Document;

@Schema()
export class Files {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  category: string;
}

export const FilesSchema = SchemaFactory.createForClass(Files);
