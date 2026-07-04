'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillForm, setSkillForm] = useState({ name: '', level: 80 });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', imageUrl: '', projectUrl: '', githubUrl: '', featured: true, technologies: '' });
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('admin_token') : null;

    if (!token) {
      router.replace('/admin');
      return;
    } 

    Promise.all([fetch('/api/skills').then((res) => res.json()), fetch('/api/projects').then((res) => res.json())])
      .then(([skillsData, projectsData]) => {
        setSkills(skillsData || []);
        setProjects(projectsData || []);
      })
      .finally(() => {
        setLoading(false);
        setReady(true);
      });
  }, [router]);

  async function handleSkillSubmit(event) {
    event.preventDefault();
    const payload = { ...skillForm, level: Number(skillForm.level) };
    const url = editingSkillId ? `/api/skills/${editingSkillId}` : '/api/skills';
    const method = editingSkillId ? 'PUT' : 'POST';
    const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (response.ok) {
      if (editingSkillId) {
        setSkills((current) => current.map((skill) => (skill.id === editingSkillId ? result.skill : skill)));
      } else {
        setSkills((current) => [result.skill, ...current]);
      }
      setSkillForm({ name: '', level: 80 });
      setEditingSkillId(null);
    }
  }

  async function handleProjectSubmit(event) {
    event.preventDefault();
    const payload = { ...projectForm, technologies: projectForm.technologies.split(',').map((value) => value.trim()).filter(Boolean) };
    const url = editingProjectId ? `/api/projects/${editingProjectId}` : '/api/projects';
    const method = editingProjectId ? 'PUT' : 'POST';
    const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (response.ok) {
      if (editingProjectId) {
        setProjects((current) => current.map((project) => (project.id === editingProjectId ? result.project : project)));
      } else {
        setProjects((current) => [result.project, ...current]);
      }
      setProjectForm({ title: '', description: '', imageUrl: '', projectUrl: '', githubUrl: '', featured: true, technologies: '' });
      setEditingProjectId(null);
    }
  }

  async function handleDeleteSkill(skillId) {
    const response = await fetch(`/api/skills/${skillId}`, { method: 'DELETE' });
    if (response.ok) {
      setSkills((current) => current.filter((skill) => skill.id !== skillId));
    }
  }

  async function handleDeleteProject(projectId) {
    const response = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
    if (response.ok) {
      setProjects((current) => current.filter((project) => project.id !== projectId));
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('admin_token');
    }
    router.replace('/admin');
  }

  if (!ready || loading) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#050816', color: 'white' }}>Loading admin dashboard...</div>;
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050816', color: 'white', padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: '#77d7ff', marginBottom: 6 }}>Admin</p>
            <h1 style={{ fontSize: 32, margin: 0 }}>Portfolio Dashboard</h1>
          </div>
          <button onClick={handleLogout} style={{ padding: '10px 14px', borderRadius: 999, border: '1px solid #3a4d73', background: 'transparent', color: 'white', cursor: 'pointer' }}>Logout</button>
        </div>

        <section style={{ padding: 24, borderRadius: 24, background: 'rgba(255,255,255,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>Add a skill</h2>
          <form onSubmit={handleSkillSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
            <input value={skillForm.name} onChange={(event) => setSkillForm((current) => ({ ...current, name: event.target.value }))} placeholder="Skill name" required style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white' }} />
            <input type="number" min="0" max="100" value={skillForm.level} onChange={(event) => setSkillForm((current) => ({ ...current, level: Number(event.target.value) }))} placeholder="Skill level" required style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white' }} />
            <button type="submit" style={{ padding: '10px 14px', borderRadius: 12, background: 'linear-gradient(135deg, #5ee7df, #b490ca)', color: '#07111f', fontWeight: 700, cursor: 'pointer' }}>{editingSkillId ? 'Update skill' : 'Save skill'}</button>
          </form>
        </section>

        <section style={{ padding: 24, borderRadius: 24, background: 'rgba(255,255,255,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>Add a project</h2>
          <form onSubmit={handleProjectSubmit} style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
            <input value={projectForm.title} onChange={(event) => setProjectForm((current) => ({ ...current, title: event.target.value }))} placeholder="Project title" required style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white' }} />
            <textarea value={projectForm.description} onChange={(event) => setProjectForm((current) => ({ ...current, description: event.target.value }))} placeholder="Project description" required style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white', minHeight: 100 }} />
            <input value={projectForm.imageUrl} onChange={(event) => setProjectForm((current) => ({ ...current, imageUrl: event.target.value }))} placeholder="Project image URL" style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white' }} />
            <input value={projectForm.projectUrl} onChange={(event) => setProjectForm((current) => ({ ...current, projectUrl: event.target.value }))} placeholder="Live demo link" style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white' }} />
            <input value={projectForm.githubUrl} onChange={(event) => setProjectForm((current) => ({ ...current, githubUrl: event.target.value }))} placeholder="GitHub link" style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white' }} />
            <input value={projectForm.technologies} onChange={(event) => setProjectForm((current) => ({ ...current, technologies: event.target.value }))} placeholder="Technologies (comma separated)" style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white' }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={projectForm.featured} onChange={(event) => setProjectForm((current) => ({ ...current, featured: event.target.checked }))} />
              Featured project
            </label>
            <button type="submit" style={{ padding: '10px 14px', borderRadius: 12, background: 'linear-gradient(135deg, #5ee7df, #b490ca)', color: '#07111f', fontWeight: 700, cursor: 'pointer' }}>{editingProjectId ? 'Update project' : 'Save project'}</button>
          </form>
        </section>

        <section style={{ display: 'grid', gap: 16 }}>
          <h2 style={{ marginBottom: 0 }}>Current items</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {skills.map((skill) => (
              <div key={skill.id} style={{ padding: 16, borderRadius: 16, background: 'rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{skill.name}</strong> — {skill.level}%
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { setSkillForm({ name: skill.name, level: skill.level }); setEditingSkillId(skill.id); }} style={{ padding: '6px 10px', borderRadius: 999, border: '1px solid #4d6b93', background: 'transparent', color: 'white', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDeleteSkill(skill.id)} style={{ padding: '6px 10px', borderRadius: 999, border: '1px solid #ff7b7b', background: 'transparent', color: '#ff7b7b', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
            {projects.map((project) => (
              <div key={project.id} style={{ padding: 16, borderRadius: 16, background: 'rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{project.title}</strong>
                  <div style={{ color: '#9fb3d1', marginTop: 4 }}>{project.description}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { setProjectForm({ title: project.title, description: project.description, imageUrl: project.imageUrl || '', projectUrl: project.projectUrl || '', githubUrl: project.githubUrl || '', featured: project.featured, technologies: (project.technologies || []).map((tech) => tech.name).join(', ') }); setEditingProjectId(project.id); }} style={{ padding: '6px 10px', borderRadius: 999, border: '1px solid #4d6b93', background: 'transparent', color: 'white', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDeleteProject(project.id)} style={{ padding: '6px 10px', borderRadius: 999, border: '1px solid #ff7b7b', background: 'transparent', color: '#ff7b7b', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
