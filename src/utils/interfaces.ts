export interface IFamily {
    id: number;
    name: string;
    family_group_id: number;
    created_at: string;
    updated_at: string;
    created_by_uid: number;
}

export interface ICluster {
    id: number;
    name: string;
    cluster_group_id: number;
    family_group_id: number;
    created_at: string;
    updated_at: string;
    is_shared: boolean;
    created_by_uid: number;
}

export interface IThing {
    id: number;
    aws_name: string;
    name: string;
    meta: string;
    is_active: boolean;
}

