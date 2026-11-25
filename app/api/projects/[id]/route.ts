import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getSupabaseClient,
  readLocalProjects,
  writeLocalProjects,
} from "@/lib/supabase/projects";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (id.startsWith("local-")) {
      const existing = await readLocalProjects();
      const updated = existing.map((p) =>
        p.id === id
          ? { ...p, ...body, updated_at: new Date().toISOString() }
          : p
      );
      await writeLocalProjects(updated);
      const project = updated.find((p) => p.id === id) || null;

      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath("/admin");
      revalidatePath("/admin/projects");
      return NextResponse.json({ success: true, project });
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase credentials are not configured." },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("projects")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

    return NextResponse.json({ success: true, project: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (id.startsWith("local-")) {
      const existing = await readLocalProjects();
      await writeLocalProjects(existing.filter((p) => p.id !== id));

      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath("/admin");
      revalidatePath("/admin/projects");
      return NextResponse.json({ success: true });
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase credentials are not configured." },
        { status: 500 }
      );
    }

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to delete project." },
      { status: 500 }
    );
  }
}
