import { BaseNode } from "@babel/types";

export type ExtendedNode = {
    children: (ExtendedNode & BaseNode)[];
    parent: (ExtendedNode & BaseNode);
    size: number;
}

export interface Context<T extends BaseNode>{
    node: T;
    parent: BaseNode;

    replaceWith(node: BaseNode): void;
}

