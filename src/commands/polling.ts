import { polling } from '../poller'

// function printDbSchemaFields(dbSchema: DbSchema): string {
//   let str = ''
//   for (const key in dbSchema) {
//     if (Object.prototype.hasOwnProperty.call(dbSchema, key)) {
//       const entry = dbSchema[key] // Type assertion
//       for (const field in entry) {
//         if (Object.prototype.hasOwnProperty.call(entry, field)) {
//           type e = keyof DbEntry
//           str += `${field}: ${entry[field as e]}\n`
//         }
//       }
//     }
//   }
//   return str
// }

// function prettyPrint(dbSchema: DbSchema): string {
//   let str = ''
//   for (const k in dbSchema) {
//     const entry = dbSchema[k]

//     str += `<img src="https://enovitae.com/${entry.splash.replace('../../../', '')}" width="250" alt="${entry.alt}">
// `
//     str += `🍾 ${entry.title}
// `
//     str += `🥂 ${entry.description}
// `
//     str += `👉 [https://enovitae.com${entry.slug}](https://enovitae.com${entry.slug})`
//     str += `

// `
//   }
//   return str
// }

export default async function run(): Promise<string> {
  // const template = readFileSync(`${__dirname}/../templates/polling.md`, 'utf8')
  const out = polling()
  if (!(out instanceof Error)) {
    //FIXME disable comment when invoked from push event, no issue/pr exists though
    // await commentToIssue(context, template, {
    //   md: prettyPrint(out)
    // })
    return 'ok'
  } else {
    console.error('error elaborating content', out)
    return 'ko'
  }
}
