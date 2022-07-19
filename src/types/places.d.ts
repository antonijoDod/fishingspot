export type TImageFormat = {
    name: string;
    url: string
}

export type TImage = {
        id: number;
        attributes: {
            name: string;
            formats: {
                thumbnail: TImageFormat
            }
        }
}

export type TImageData = {
    data: TImage | null
}

export type TPlaceAttributes = {
    title: string;
    createdAt: string;
    updatedAt: string;
    latitude: number | undefined;
    longitude: number | undefined;
    featured_image: TImageData;
}

export type TPlace = {
    id: number;
    attributes: TPlaceAttributes;
}

export type TPagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export type TMeta = {
    pagination: TPagination
}

export type TPlaces = {
    data: TPlace[]
    meta: TMeta
}