CREATE TABLE IF NOT EXISTS public."User"
(
    "userID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    username character varying COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

CREATE TABLE IF NOT EXISTS public."UserLayer"
(
    "layerID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "layerName" character varying COLLATE pg_catalog."default" NOT NULL,
    "isActive" boolean NOT NULL,
    "isFavorite" boolean NOT NULL,
    opacity integer NOT NULL DEFAULT 100,
    "userID" integer NOT NULL,
    CONSTRAINT "pk_layerID" PRIMARY KEY ("layerID"),
    CONSTRAINT "fk_userID" FOREIGN KEY ("userID")
        REFERENCES public."User" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public."UserArea"
(
    "areaID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "areaName" character varying COLLATE pg_catalog."default" NOT NULL,
    "isActive" boolean NOT NULL DEFAULT false,
    "isFavorite" boolean NOT NULL DEFAULT false,
    "isCustom" boolean NOT NULL DEFAULT false,
    "userID" integer NOT NULL,
    CONSTRAINT "pk_userArea" PRIMARY KEY ("areaID", "userID"),
    CONSTRAINT "fk_userID" FOREIGN KEY ("userID")
        REFERENCES public."User" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
