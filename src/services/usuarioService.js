const API_URL = "http://localhost:3000/api/instructores";

// 🔹 Leer todos los instructores
export const leerUsuarios = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al leer usuarios");
    return await res.json();
  } catch (error) {
    console.error("❌ Error en leerUsuarios:", error);
    return [];
  }
};

// 🔹 Crear un nuevo instructor
export const crearUsuario = async (usuario) => {
  try {
    // Asegurar que se envíen todos los campos necesarios
    const usuarioCompleto = {
      ...usuario,
      id_rol: usuario.id_rol || 2, // por defecto "Instructor"
      estado: usuario.estado || 1, // activo
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioCompleto),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("⚠️ Error del backend:", errorText);
      throw new Error("Error al crear usuario");
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error en crearUsuario:", error);
    throw error;
  }
};

// 🔹 Actualizar instructor
export const actualizarUsuario = async (usuario) => {
  try {
    const res = await fetch(`${API_URL}/${usuario.id_instructor}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (!res.ok) throw new Error("Error al actualizar usuario");
    return await res.json();
  } catch (error) {
    console.error("❌ Error en actualizarUsuario:", error);
    throw error;
  }
};

// 🔹 Eliminar instructor
export const eliminarUsuario = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar usuario");
    return await res.json();
  } catch (error) {
    console.error("❌ Error en eliminarUsuario:", error);
    throw error;
  }
};
