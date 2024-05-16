import { PartialType } from "@nestjs/mapped-types";
import { createSectionDto } from "./create-section.dto";

export class updateSectionDto extends PartialType(createSectionDto){}