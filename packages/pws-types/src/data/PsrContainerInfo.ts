import { PsrContainerInfoField } from "./PsrContainerInfoField"

export type PsrContainerInfo = {
  BaseContainerName: string // Name of the base container
  ContainerInfo: string // Container information, e.g. combined items
  ContainerInfoFields: PsrContainerInfoField[] // Container info fields
  ContainerName: string // Combined container name
}
