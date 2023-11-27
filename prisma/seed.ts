import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  await prisma.post.create({
    data: {
      title: 'UFMT Sinop',
      content: 'Descubra o ambiente acadêmico vibrante da UFMT em Sinop, MT. Comprometida com a excelência educacional, a instituição oferece uma variedade de cursos e oportunidades para o crescimento intelectual. Explore seus horizontes e construa um futuro sólido na UFMT Sinop! 🎓🌟 #UFMT #SinopMT #EducaçãoSuperior',
      img: 'ufmt.png',
      resume: 'Educação de qualidade no coração do Mato Grosso.',
      published: true
    }
  })

  await prisma.post.create({
    data: {
      title: 'UFPR Curitiba',
      content: 'Imerso na atmosfera cultural de Curitiba, a UFPR é uma instituição líder em educação superior. Com uma gama diversificada de cursos e uma comunidade acadêmica apaixonada, a UFPR inspira inovação e excelência. Descubra o que faz dela uma referência no cenário educacional paranaense! 🏫🌐 #UFPR #Curitiba #EducaçãoSuperior',
      img: 'ufpr.png',
      resume: 'Vanguarda acadêmica no Paraná.',
      published: true
    }
  })

  await prisma.post.create({
    data: {
      title: 'USP São Paulo',
      content: 'São Paulo pulsa com o dinamismo da USP, uma instituição pioneira e global. Com pesquisa de ponta e uma comunidade vibrante, a USP molda o futuro da educação e da inovação. Conecte-se com o espírito vanguardista da USP! 🎓🌟 #USP #SãoPaulo #InovaçãoAcadêmica',
      img: 'usp.png',
      resume: 'Pioneirismo acadêmico.',
      published: true
    }
  })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
