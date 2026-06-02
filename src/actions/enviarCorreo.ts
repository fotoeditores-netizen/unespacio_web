'use server'

import nodemailer from 'nodemailer'
import type { Cita } from '@/types/citas'

const ADMIN_EMAIL = 'Unespacioarquitectos@gmail.com'

function crearTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })
}

function formatearFecha(fecha: string): string {
  const [year, month, day] = fecha.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function enviarCorreoCitaAdmin(cita: Cita): Promise<void> {
  const transporter = crearTransporter()
  await transporter.sendMail({
    from: `"UnEspacio Arquitectos" <${process.env.GMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `Nueva cita — ${cita.nombre} · ${formatearFecha(cita.fecha)} ${cita.hora}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D2F1E;">Nueva cita agendada</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding:8px 0; color:#787A68; font-size:13px;">Nombre</td><td style="padding:8px 0; font-weight:600;">${cita.nombre}</td></tr>
          <tr><td style="padding:8px 0; color:#787A68; font-size:13px;">Correo</td><td style="padding:8px 0;"><a href="mailto:${cita.correo}">${cita.correo}</a></td></tr>
          <tr><td style="padding:8px 0; color:#787A68; font-size:13px;">Teléfono</td><td style="padding:8px 0;">${cita.telefono}</td></tr>
          <tr><td style="padding:8px 0; color:#787A68; font-size:13px;">Tipo</td><td style="padding:8px 0;">${cita.tipo_consulta}</td></tr>
          <tr><td style="padding:8px 0; color:#787A68; font-size:13px;">Fecha</td><td style="padding:8px 0;">${formatearFecha(cita.fecha)}</td></tr>
          <tr><td style="padding:8px 0; color:#787A68; font-size:13px;">Hora</td><td style="padding:8px 0;">${cita.hora}</td></tr>
          ${cita.mensaje ? `<tr><td style="padding:8px 0; color:#787A68; font-size:13px; vertical-align:top;">Mensaje</td><td style="padding:8px 0;">${cita.mensaje}</td></tr>` : ''}
        </table>
        <p style="margin-top:24px; font-size:12px; color:#787A68;">
          Gestiona esta cita en <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/admin/citas">el panel de administración</a>.
        </p>
      </div>
    `,
  })
}

export async function enviarCorreoConfirmacionCliente(cita: Cita): Promise<void> {
  const transporter = crearTransporter()
  await transporter.sendMail({
    from: `"UnEspacio Arquitectos" <${process.env.GMAIL_USER}>`,
    to: cita.correo,
    subject: `Tu cita está agendada — ${formatearFecha(cita.fecha)}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D2F1E;">¡Hola, ${cita.nombre}!</h2>
        <p style="color: #787A68;">Tu cita con UnEspacio Arquitectos ha sido registrada. Te confirmaremos por este medio pronto.</p>
        <div style="background:#EDE9DC; padding:20px; margin:24px 0;">
          <p style="margin:0 0 8px; font-size:13px; color:#787A68;">Tipo de consulta</p>
          <p style="margin:0; font-weight:600; color:#2D2F1E; font-size:18px;">${cita.tipo_consulta}</p>
          <p style="margin:16px 0 4px; font-size:13px; color:#787A68;">Fecha y hora</p>
          <p style="margin:0; font-weight:600; color:#2D2F1E; font-size:18px;">${formatearFecha(cita.fecha)} · ${cita.hora}</p>
        </div>
        <p style="color: #787A68; font-size:13px;">
          Si necesitas modificar o cancelar tu cita responde a este correo o escríbenos a
          <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>.
        </p>
        <p style="margin-top:32px; font-size:12px; color:#787A68;">— El equipo de UnEspacio Arquitectos</p>
      </div>
    `,
  })
}

export async function enviarCorreoCambioEstado(cita: Cita): Promise<void> {
  const transporter = crearTransporter()
  const esConfirmada = cita.estado === 'confirmada'
  const asunto = esConfirmada
    ? `Cita confirmada — ${formatearFecha(cita.fecha)} · ${cita.hora}`
    : `Actualización de tu cita — UnEspacio Arquitectos`

  await transporter.sendMail({
    from: `"UnEspacio Arquitectos" <${process.env.GMAIL_USER}>`,
    to: cita.correo,
    subject: asunto,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D2F1E;">Hola, ${cita.nombre}</h2>
        ${esConfirmada
          ? `<p style="color:#787A68;">Tu cita ha sido <strong style="color:#2D2F1E;">confirmada</strong>. Te esperamos el <strong>${formatearFecha(cita.fecha)}</strong> a las <strong>${cita.hora}</strong>.</p>`
          : `<p style="color:#787A68;">Lamentablemente tu cita del <strong>${formatearFecha(cita.fecha)}</strong> a las <strong>${cita.hora}</strong> ha sido cancelada. Por favor contáctanos para reagendar.</p>`
        }
        <p style="color: #787A68; font-size:13px; margin-top:24px;">
          ¿Tienes preguntas? Escríbenos a <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a> o al
          <a href="https://wa.me/573014375950">+57 301 437 5950</a>.
        </p>
        <p style="margin-top:32px; font-size:12px; color:#787A68;">— El equipo de UnEspacio Arquitectos</p>
      </div>
    `,
  })
}
