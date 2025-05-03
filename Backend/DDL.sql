--DDL Para la base de datos, está en PostgreSQL
CREATE TABLE usuarios (
    id_usuario BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom_usuario VARCHAR(50) NOT NULL,
    ape_usuario VARCHAR(50) NOT NULL,
    email_usuario VARCHAR(100) NOT NULL UNIQUE,
    pass_usuario VARCHAR(255) NOT NULL,  
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('usuario', 'agente')),
    departamento VARCHAR(100)
);

CREATE TABLE sla (
    id_sla BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom_sla VARCHAR(100) NOT NULL,
    tiempo_sla INT NOT NULL 
);

CREATE TABLE servicios (
    id_servicio BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom_servicio VARCHAR(100) NOT NULL,
    desc_servicio TEXT
);

CREATE TABLE categorias (
    id_categoria BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE subcategorias (
    id_subcategoria BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_subcategoria VARCHAR(100) NOT NULL,
    id_categoria BIGINT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE articulos (
    id_articulo BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo_articulo VARCHAR(100),
    conten_articulo TEXT,
    id_categoria BIGINT,
    id_subcategoria BIGINT,
    fecha_articulo DATE,
    id_tecnico_creador BIGINT,
    FOREIGN KEY (id_tecnico_creador) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_subcategoria) REFERENCES subcategorias(id_subcategoria)
);

CREATE TABLE activos (
    id_activo BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    serial_activo VARCHAR(100),
    marca_activo VARCHAR(100),
    modelo_activo VARCHAR(100),
    id_categoria BIGINT,
    id_subcategoria BIGINT,
    fec_compra DATE,
    estado_activo VARCHAR(50),
    ubica_activo VARCHAR(100),
    id_usuario_resp BIGINT,
    FOREIGN KEY (id_usuario_resp) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_subcategoria) REFERENCES subcategorias(id_subcategoria)
);

CREATE TABLE cambios (
    id_cambio BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo_cambio VARCHAR(200),
    desc_cambio TEXT,
    tipo_cambio VARCHAR(50),
    fecha_cambio TIMESTAMP,
    riesgo_cambio VARCHAR(50),
    estado_cambio VARCHAR(50),
    id_tecnico BIGINT,
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id_usuario)
);

CREATE TABLE tickets (
    id_ticket BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo_ticket VARCHAR(50) NOT NULL CHECK (tipo_ticket IN ('incidente', 'solicitud')),
    titulo_ticket VARCHAR(200),
    desc_ticket TEXT,
    fe_ini_ticket TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fe_fin_ticket TIMESTAMP,
    estado_ticket VARCHAR(50),
    id_usuario BIGINT NOT NULL,
    id_agente BIGINT,
    id_articulo BIGINT,
    id_sla BIGINT,
    id_servicio BIGINT,
    fe_lim_ticket TIMESTAMP,
    cump_sla BOOLEAN,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_agente) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo),
    FOREIGN KEY (id_sla) REFERENCES sla(id_sla),
    FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio)
);

CREATE TABLE historial_estados (
    id_historial BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_ticket BIGINT NOT NULL,
    estado_ticket VARCHAR(50),
    fecha_estado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ticket) REFERENCES tickets(id_ticket)
);
