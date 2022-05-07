import { assertStrictEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts";
import { Parser } from "../index.js"

Deno.test("tokenize", () => {

	assertStrictEquals(Parser.tokenize(`0 HEAD`).length, 1)
	assertStrictEquals(Parser.tokenize(`0 HEAD
	`).length, 1)
	assertStrictEquals(Parser.tokenize(`
		0 HEAD
	`).length, 1)
	assertStrictEquals(Parser.tokenize(`0 HEAD
		1 SUBM @U1
	`).length, 2)
	assertStrictEquals(Parser.tokenize(`0 HEAD
		1 SUBM @U1`).length, 2)

})

Deno.test("simpleRecord", () => {

	assertStrictEquals(Parser.parse(`0 HEAD`)[0].name, "HEAD")
	assertStrictEquals(Parser.parse(`0 HEAD`)[0].value, null)
	assertStrictEquals(Parser.parse(`0 HEAD`)[0].parentRecord, null)
	assertStrictEquals(Parser.parse(`1 SUBM @U1`).length, 0)

})

Deno.test("singleRecord", () => {

	const records = Parser.parse(`0 HEAD
1 GEDC
2 VERS 5.5.5
2 FORM LINEAGE-LINKED
3 VERS 5.5.5
1 CHAR UTF-8
1 SOUR gedcom.org
2 NAME The GEDCOM Site
2 VERS 5.5.5
2 CORP gedcom.org
3 ADDR
4 CITY LEIDEN
3 WWW www.gedcom.org
1 DATE 2 Oct 2019
2 TIME 0:00:00
1 FILE REMARR.GED
1 LANG English
1 SUBM @U1@
`	)
	assertStrictEquals(records.length, 1)
	assertStrictEquals(records[0].name, "HEAD")
	assertStrictEquals(records[0].records.length, 7)
	assertStrictEquals(records[0].value, null)

	assertStrictEquals(records[0].records[0].name, "GEDC")
	assertStrictEquals(records[0].records[0].records[0].name, "VERS")
	assertStrictEquals(records[0].records[0].records.length, 2)
	assertStrictEquals(records[0].records[0].records[0].value, "5.5.5")
	assertStrictEquals(records[0].records[0].parentRecord, records[0])
	assertStrictEquals(records[0].records[0].records[0].parentRecord, records[0].records[0])

	assertStrictEquals(records[0].records[0].records[1].name, "FORM")
	assertStrictEquals(records[0].records[0].records[1].records.length, 1)
	assertStrictEquals(records[0].records[0].records[1].records[0].name, "VERS")
	assertStrictEquals(records[0].records[0].records[1].parentRecord, records[0].records[0])

	assertStrictEquals(records[0].records[1].name, "CHAR")
	assertStrictEquals(records[0].records[1].records.length, 0)
	assertStrictEquals(records[0].records[1].parentRecord, records[0])

	assertStrictEquals(records[0].records[2].name, "SOUR")
	assertStrictEquals(records[0].records[2].records.length, 3)
	assertStrictEquals(records[0].records[2].parentRecord, records[0])

	assertStrictEquals(records[0].records[2].records[0].name, "NAME")
	assertStrictEquals(records[0].records[2].records[0].records.length, 0)
	assertStrictEquals(records[0].records[2].records[0].value, "The GEDCOM Site")
	assertStrictEquals(records[0].records[2].records[0].parentRecord, records[0].records[2])

	assertStrictEquals(records[0].records[2].records[1].name, "VERS")
	assertStrictEquals(records[0].records[2].records[1].records.length, 0)
	assertStrictEquals(records[0].records[2].records[1].parentRecord, records[0].records[2])

	assertStrictEquals(records[0].records[2].records[2].name, "CORP")
	assertStrictEquals(records[0].records[2].records[2].records[0].name, "ADDR")
	assertStrictEquals(records[0].records[2].records[2].records[0].parentRecord, records[0].records[2].records[2])
	assertStrictEquals(records[0].records[2].records[2].parentRecord, records[0].records[2])

	assertStrictEquals(records[0].records[2].records[2].records[0].records.length, 1)
	assertStrictEquals(records[0].records[2].records[2].records[0].records[0].name, "CITY")
	assertStrictEquals(records[0].records[2].records[2].records[0].records[0].parentRecord, records[0].records[2].records[2].records[0])

	assertStrictEquals(records[0].records[2].records[2].records[1].name, "WWW")
	assertStrictEquals(records[0].records[2].records[2].records[1].records.length, 0)
	assertStrictEquals(records[0].records[2].records[2].records[1].parentRecord, records[0].records[2].records[2])

	assertStrictEquals(records[0].records[3].name, "DATE")
	assertStrictEquals(records[0].records[3].records.length, 1)
	assertStrictEquals(records[0].records[3].parentRecord, records[0])

	assertStrictEquals(records[0].records[3].records[0].name, "TIME")
	assertStrictEquals(records[0].records[3].records[0].records.length, 0)
	assertStrictEquals(records[0].records[3].records[0].value, "0:00:00")
	assertStrictEquals(records[0].records[3].records[0].parentRecord, records[0].records[3])

	assertStrictEquals(records[0].records[4].name, "FILE")
	assertStrictEquals(records[0].records[4].records.length, 0)
	assertStrictEquals(records[0].records[4].parentRecord, records[0])

	assertStrictEquals(records[0].records[5].name, "LANG")
	assertStrictEquals(records[0].records[5].records.length, 0)
	assertStrictEquals(records[0].records[5].parentRecord, records[0])

	assertStrictEquals(records[0].records[6].name, "SUBM")
	assertStrictEquals(records[0].records[6].records.length, 0)
	assertStrictEquals(records[0].records[6].parentRecord, records[0])

})

Deno.test("multipleRecords", () => {

	const records = Parser.parse(`0 HEAD
1 GEDC
0 FORM LINEAGE-LINKED
1 VERS 5.5.5
`	)
	assertStrictEquals(records[0].name, "HEAD")
	assertStrictEquals(records[0].records[0].name, "GEDC")
	assertStrictEquals(records[1].name, "FORM")
	assertStrictEquals(records[1].records[0].name, "VERS")

})

Deno.test("levelOrder", () => {

		const records = Parser.parse(`0 HEAD
1 GEDC
4 CITY LEIDEN
2 CORP gedcom.org
1 TEST
	`	)
		assertStrictEquals(Parser.parse(`0 HEAD`).length, 1)

		assertStrictEquals(records[0].name, "HEAD")
		assertStrictEquals(records.length, 1)
		assertStrictEquals(records[0].records.length, 2)
		assertStrictEquals(records[0].records[0].name, "GEDC")
		assertStrictEquals(records[0].records[0].parentRecord, records[0])
		assertStrictEquals(records[0].records[0].records[0].parentRecord, records[0].records[0])
		assertStrictEquals(records[0].records[0].records[0].name, "CORP")
		assertStrictEquals(records[0].records[0].records[0].value, "gedcom.org")
		assertStrictEquals(records[0].records[1].parentRecord, records[0])
		assertStrictEquals(records[0].records[1].name, "TEST")

		assertStrictEquals(Parser.parse(`1 HEAD`).length, 0)
		assertStrictEquals(Parser.parse(`1 HEAD
0 TEST`)[0].name, "TEST")
		assertStrictEquals(Parser.parse(`1 HEAD
2 TEST`).length, 0)
		assertStrictEquals(Parser.parse(`1 HEAD
1 TEST`).length, 0)
		assertStrictEquals(Parser.parse(`0 HEAD
2 TEST`).length, 1)
		assertStrictEquals(Parser.parse(`0 HEAD
2 TEST`)[0].records.length, 0)

		const records_ = Parser.parse(`0 HEAD
1 GEDC
0 VERS 5.5.5
2 VERS 5.5.5`)

		assertStrictEquals(records_.length, 2)
		assertStrictEquals(records_[0].records[0].parentRecord, records_[0])
		assertStrictEquals(records_[0].records[0].name, "GEDC")
		assertStrictEquals(records_[0].records.length, 1)
		assertStrictEquals(records_[0].records[0].records[0].parentRecord, records_[0].records[0])
		assertStrictEquals(records_[0].records[0].records[0].name, "VERS")
		assertStrictEquals(records_[0].records[0].records.length, 1)

})
