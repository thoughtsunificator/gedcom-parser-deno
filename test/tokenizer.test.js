import { assertStrictEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts";

import { Token, Tokenizer } from "../index.js"

Deno.test("level", () => {

	assertStrictEquals(Tokenizer.tokenize(`032132`).length, 0)
	assertStrictEquals(Tokenizer.tokenize(`032132 `).length, 0)
	assertStrictEquals(Tokenizer.tokenize(`032132
`).length, 0)
	assertStrictEquals(Tokenizer.tokenize(`032132
		1`).length, 0)
	assertStrictEquals(Tokenizer.tokenize(`032132
1
		0`).length, 0)

})

Deno.test("identifier", () => {

	const tokens = Tokenizer.tokenize(`032132 HEAD`)

	assertStrictEquals(tokens.length, 3)

	assertStrictEquals(tokens[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[0].buffer, "032132")
	assertStrictEquals(tokens[0].index, 0)

	assertStrictEquals(tokens[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[1].buffer, " ")
	assertStrictEquals(tokens[1].index, 6)

	assertStrictEquals(tokens[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[2].buffer, "HEAD")
	assertStrictEquals(tokens[2].index, 7)

	const tokens_ = Tokenizer.tokenize(`032132 H`)

	assertStrictEquals(tokens_.length, 3)

	assertStrictEquals(tokens_[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens_[0].buffer, "032132")
	assertStrictEquals(tokens_[0].index, 0)

	assertStrictEquals(tokens_[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[1].buffer, " ")
	assertStrictEquals(tokens_[1].index, 6)

	assertStrictEquals(tokens_[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens_[2].buffer, "H")
	assertStrictEquals(tokens_[2].index, 7)

	const tokens__ = Tokenizer.tokenize(`032132 H `)

	assertStrictEquals(tokens__.length, 3)

	assertStrictEquals(tokens__[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens__[0].buffer, "032132")
	assertStrictEquals(tokens__[0].index, 0)

	assertStrictEquals(tokens__[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens__[1].buffer, " ")
	assertStrictEquals(tokens__[1].index, 6)

	assertStrictEquals(tokens__[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens__[2].buffer, "H")
	assertStrictEquals(tokens__[2].index, 7)

})

Deno.test("information", () => {

	const tokens = Tokenizer.tokenize(`032132 HEAD TEST`)

	assertStrictEquals(tokens.length, 5)

	assertStrictEquals(tokens[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[0].buffer, "032132")
	assertStrictEquals(tokens[0].index, 0)

	assertStrictEquals(tokens[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[1].buffer, " ")
	assertStrictEquals(tokens[1].index, 6)

	assertStrictEquals(tokens[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[2].buffer, "HEAD")
	assertStrictEquals(tokens[2].index, 7)

	assertStrictEquals(tokens[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[3].buffer, " ")
	assertStrictEquals(tokens[3].index, 11)

	assertStrictEquals(tokens[4].name, Token.NAME_INFORMATION)
	assertStrictEquals(tokens[4].buffer, "TEST")
	assertStrictEquals(tokens[4].index, 12)

	const tokens_ = Tokenizer.tokenize(`1 SUBM @U1`)

	assertStrictEquals(tokens_.length, 5)

	assertStrictEquals(tokens_[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens_[0].buffer, "1")
	assertStrictEquals(tokens_[0].index, 0)

	assertStrictEquals(tokens_[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[1].buffer, " ")
	assertStrictEquals(tokens_[1].index, 1)

	assertStrictEquals(tokens_[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens_[2].buffer, "SUBM")
	assertStrictEquals(tokens_[2].index, 2)

	assertStrictEquals(tokens_[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[3].buffer, " ")
	assertStrictEquals(tokens_[3].index, 6)

	assertStrictEquals(tokens_[4].name, Token.NAME_INFORMATION)
	assertStrictEquals(tokens_[4].buffer, "@U1")
	assertStrictEquals(tokens_[4].index, 7)

	const tokens__ = Tokenizer.tokenize(`032132 HEAD TEST DSA SDADsa CXCXZ`)

	assertStrictEquals(tokens__.length, 5)

	assertStrictEquals(tokens__[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens__[0].buffer, "032132")
	assertStrictEquals(tokens__[0].index, 0)

	assertStrictEquals(tokens__[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens__[1].buffer, " ")
	assertStrictEquals(tokens__[1].index, 6)

	assertStrictEquals(tokens__[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens__[2].buffer, "HEAD")
	assertStrictEquals(tokens__[2].index, 7)

	assertStrictEquals(tokens__[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens__[3].buffer, " ")
	assertStrictEquals(tokens__[3].index, 11)

	assertStrictEquals(tokens__[4].name, Token.NAME_INFORMATION)
	assertStrictEquals(tokens__[4].buffer, "TEST DSA SDADsa CXCXZ")
	assertStrictEquals(tokens__[4].index, 12)

	const tokens___ = Tokenizer.tokenize(`0 DATE  6 Mar 2004`)

	assertStrictEquals(tokens___.length, 5)

	assertStrictEquals(tokens___[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens___[0].buffer, "0")
	assertStrictEquals(tokens___[0].index, 0)

	assertStrictEquals(tokens___[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens___[1].buffer, " ")
	assertStrictEquals(tokens___[1].index, 1)

	assertStrictEquals(tokens___[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens___[2].buffer, "DATE")
	assertStrictEquals(tokens___[2].index, 2)

	assertStrictEquals(tokens___[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens___[3].buffer, " ")
	assertStrictEquals(tokens___[3].index, 6)

	assertStrictEquals(tokens___[4].name, Token.NAME_INFORMATION)
	assertStrictEquals(tokens___[4].buffer, " 6 Mar 2004")
	assertStrictEquals(tokens___[4].index, 7)


})

Deno.test("reference", () => {

	const tokens = Tokenizer.tokenize(`032132 @UI@ MYIDENTIFIER`)

	assertStrictEquals(tokens.length, 5)

	assertStrictEquals(tokens[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[0].buffer, "032132")
	assertStrictEquals(tokens[0].index, 0)

	assertStrictEquals(tokens[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[1].buffer, " ")
	assertStrictEquals(tokens[1].index, 6)

	assertStrictEquals(tokens[2].name, Token.NAME_REFERENCE)
	assertStrictEquals(tokens[2].buffer, "@UI@")
	assertStrictEquals(tokens[2].index, 7)

	assertStrictEquals(tokens[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[3].buffer, " ")
	assertStrictEquals(tokens[3].index, 11)

	assertStrictEquals(tokens[4].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[4].buffer, "MYIDENTIFIER")
	assertStrictEquals(tokens[4].index, 12)

	const tokens_ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@`)

	assertStrictEquals(tokens_.length, 5)

	assertStrictEquals(tokens_[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens_[0].buffer, "032132")
	assertStrictEquals(tokens_[0].index, 0)

	assertStrictEquals(tokens_[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[1].buffer, " ")
	assertStrictEquals(tokens_[1].index, 6)

	assertStrictEquals(tokens_[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens_[2].buffer, "MYIDENTIFIER")
	assertStrictEquals(tokens_[2].index, 7)

	assertStrictEquals(tokens_[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[3].buffer, " ")
	assertStrictEquals(tokens_[3].index, 19)

	assertStrictEquals(tokens_[4].name, Token.NAME_REFERENCE)
	assertStrictEquals(tokens_[4].buffer, "@UI@")
	assertStrictEquals(tokens_[4].index, 20)

	const tokens__ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@ `)

	assertStrictEquals(tokens__.length, 5)

	assertStrictEquals(tokens__[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens__[0].buffer, "032132")
	assertStrictEquals(tokens__[0].index, 0)

	assertStrictEquals(tokens__[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens__[1].buffer, " ")
	assertStrictEquals(tokens__[1].index, 6)

	assertStrictEquals(tokens__[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens__[2].buffer, "MYIDENTIFIER")
	assertStrictEquals(tokens__[2].index, 7)

	assertStrictEquals(tokens__[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens__[3].buffer, " ")
	assertStrictEquals(tokens__[3].index, 19)

	assertStrictEquals(tokens__[4].name, Token.NAME_REFERENCE)
	assertStrictEquals(tokens__[4].buffer, "@UI@")
	assertStrictEquals(tokens__[4].index, 20)

	const tokens___ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@ dsadsad`)

	assertStrictEquals(tokens___.length, 5)

	assertStrictEquals(tokens___[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens___[0].buffer, "032132")
	assertStrictEquals(tokens___[0].index, 0)

	assertStrictEquals(tokens___[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens___[1].buffer, " ")
	assertStrictEquals(tokens___[1].index, 6)

	assertStrictEquals(tokens___[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens___[2].buffer, "MYIDENTIFIER")
	assertStrictEquals(tokens___[2].index, 7)

	assertStrictEquals(tokens___[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens___[3].buffer, " ")
	assertStrictEquals(tokens___[3].index, 19)

	assertStrictEquals(tokens___[4].name, Token.NAME_REFERENCE)
	assertStrictEquals(tokens___[4].buffer, "@UI@")
	assertStrictEquals(tokens___[4].index, 20)

	const tokens____ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@ dsadsad dsadsa`)

	assertStrictEquals(tokens____.length, 5)

	assertStrictEquals(tokens____[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens____[0].buffer, "032132")
	assertStrictEquals(tokens____[0].index, 0)

	assertStrictEquals(tokens____[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens____[1].buffer, " ")
	assertStrictEquals(tokens____[1].index, 6)

	assertStrictEquals(tokens____[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens____[2].buffer, "MYIDENTIFIER")
	assertStrictEquals(tokens____[2].index, 7)

	assertStrictEquals(tokens____[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens____[3].buffer, " ")
	assertStrictEquals(tokens____[3].index, 19)

	assertStrictEquals(tokens____[4].name, Token.NAME_REFERENCE)
	assertStrictEquals(tokens____[4].buffer, "@UI@")
	assertStrictEquals(tokens____[4].index, 20)

})

Deno.test("lineFeed", () => {

	const tokens = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@
1 GEDC
4 @UJ@ XS
2 FORM LINEAGE-LINKED`)

	assertStrictEquals(tokens.length, 21)

	assertStrictEquals(tokens[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[0].buffer, "032132")
	assertStrictEquals(tokens[0].index, 0)

	assertStrictEquals(tokens[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[1].buffer, " ")
	assertStrictEquals(tokens[1].index, 6)

	assertStrictEquals(tokens[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[2].buffer, "MYIDENTIFIER")
	assertStrictEquals(tokens[2].index, 7)

	assertStrictEquals(tokens[3].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[3].buffer, " ")
	assertStrictEquals(tokens[3].index, 19)

	assertStrictEquals(tokens[4].name, Token.NAME_REFERENCE)
	assertStrictEquals(tokens[4].buffer, "@UI@")
	assertStrictEquals(tokens[4].index, 20)

	assertStrictEquals(tokens[5].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens[5].buffer, "\n")
	assertStrictEquals(tokens[5].index, 24)

	assertStrictEquals(tokens[6].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[6].buffer, "1")
	assertStrictEquals(tokens[6].index, 25)

	assertStrictEquals(tokens[7].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[7].buffer, " ")
	assertStrictEquals(tokens[7].index, 26)

	assertStrictEquals(tokens[8].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[8].buffer, "GEDC")
	assertStrictEquals(tokens[8].index, 27)

	assertStrictEquals(tokens[9].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens[9].buffer, "\n")
	assertStrictEquals(tokens[9].index, 31)

	assertStrictEquals(tokens[10].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[10].buffer, "4")
	assertStrictEquals(tokens[10].index, 32)

	assertStrictEquals(tokens[11].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[11].buffer, " ")
	assertStrictEquals(tokens[11].index, 33)

	assertStrictEquals(tokens[12].name, Token.NAME_REFERENCE)
	assertStrictEquals(tokens[12].buffer, "@UJ@")
	assertStrictEquals(tokens[12].index, 34)

	assertStrictEquals(tokens[13].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[13].buffer, " ")
	assertStrictEquals(tokens[13].index, 38)

	assertStrictEquals(tokens[14].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[14].buffer, "XS")
	assertStrictEquals(tokens[14].index, 39)

	assertStrictEquals(tokens[15].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens[15].buffer, "\n")
	assertStrictEquals(tokens[15].index, 41)

	assertStrictEquals(tokens[16].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[16].buffer, "2")
	assertStrictEquals(tokens[16].index, 42)

	assertStrictEquals(tokens[17].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[17].buffer, " ")
	assertStrictEquals(tokens[17].index, 43)

	assertStrictEquals(tokens[18].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[18].buffer, "FORM")
	assertStrictEquals(tokens[18].index, 44)

	assertStrictEquals(tokens[19].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[19].buffer, " ")
	assertStrictEquals(tokens[19].index, 48)

	assertStrictEquals(tokens[20].name, Token.NAME_INFORMATION)
	assertStrictEquals(tokens[20].buffer, "LINEAGE-LINKED")
	assertStrictEquals(tokens[20].index, 49)

	const tokens_ = Tokenizer.tokenize(`1 GEDC



	2 FORM LINEAGE-LINKED

		`)

	assertStrictEquals(tokens_.length, 10)

	assertStrictEquals(tokens_[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens_[0].buffer, "1")
	assertStrictEquals(tokens_[0].index, 0)

	assertStrictEquals(tokens_[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[1].buffer, " ")
	assertStrictEquals(tokens_[1].index, 1)

	assertStrictEquals(tokens_[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens_[2].buffer, "GEDC")
	assertStrictEquals(tokens_[2].index, 2)

	assertStrictEquals(tokens_[3].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens_[3].buffer, "\n")
	assertStrictEquals(tokens_[3].index, 6)

	assertStrictEquals(tokens_[4].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens_[4].buffer, "2")
	assertStrictEquals(tokens_[4].index, 11)

	assertStrictEquals(tokens_[5].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[5].buffer, " ")
	assertStrictEquals(tokens_[5].index, 12)

	assertStrictEquals(tokens_[6].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens_[6].buffer, "FORM")
	assertStrictEquals(tokens_[6].index, 13)

	assertStrictEquals(tokens_[7].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[7].buffer, " ")
	assertStrictEquals(tokens_[7].index, 17)

	assertStrictEquals(tokens_[8].name, Token.NAME_INFORMATION)
	assertStrictEquals(tokens_[8].buffer, "LINEAGE-LINKED")
	assertStrictEquals(tokens_[8].index, 18)

	assertStrictEquals(tokens_[9].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens_[9].buffer, "\n")
	assertStrictEquals(tokens_[9].index, 32)

})

Deno.test("invalidRecords", () => {

	assertStrictEquals(Tokenizer.tokenize("@").length, 0)
	assertStrictEquals(Tokenizer.tokenize("@UI@ 01").length, 0)
	assertStrictEquals(Tokenizer.tokenize("UI@ 01").length, 0)

	const tokens = Tokenizer.tokenize(`0 HEAD
@UI@ 01
1 TEST`)

	assertStrictEquals(tokens.length, 7)

	assertStrictEquals(tokens[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[0].buffer, "0")
	assertStrictEquals(tokens[0].index, 0)

	assertStrictEquals(tokens[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[1].buffer, " ")
	assertStrictEquals(tokens[1].index, 1)

	assertStrictEquals(tokens[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[2].buffer, "HEAD")
	assertStrictEquals(tokens[2].index, 2)

	assertStrictEquals(tokens[3].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens[3].buffer, "\n")
	assertStrictEquals(tokens[3].index, 6)

	assertStrictEquals(tokens[4].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[4].buffer, "1")
	assertStrictEquals(tokens[4].index, 15)

	assertStrictEquals(tokens[5].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[5].buffer, " ")
	assertStrictEquals(tokens[5].index, 16)

	assertStrictEquals(tokens[6].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[6].buffer, "TEST")
	assertStrictEquals(tokens[6].index, 17)

	const tokens_ = Tokenizer.tokenize("0 HEAD\n2\n1 TEST")

	assertStrictEquals(tokens_.length, 7)

	assertStrictEquals(tokens_[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens_[0].buffer, "0")
	assertStrictEquals(tokens_[0].index, 0)

	assertStrictEquals(tokens_[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[1].buffer, " ")
	assertStrictEquals(tokens_[1].index, 1)

	assertStrictEquals(tokens_[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens_[2].buffer, "HEAD")
	assertStrictEquals(tokens_[2].index, 2)

	assertStrictEquals(tokens_[3].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens_[3].buffer, "\n")
	assertStrictEquals(tokens_[3].index, 6)

	assertStrictEquals(tokens_[4].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens_[4].buffer, "1")
	assertStrictEquals(tokens_[4].index, 9)

	assertStrictEquals(tokens_[5].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[5].buffer, " ")
	assertStrictEquals(tokens_[5].index, 10)

	assertStrictEquals(tokens_[6].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens_[6].buffer, "TEST")
	assertStrictEquals(tokens_[6].index, 11)

	const tokens__ = Tokenizer.tokenize("0 HEAD\n2 \n1 TEST")

	assertStrictEquals(tokens__.length, 7)

	assertStrictEquals(tokens__[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens__[0].buffer, "0")
	assertStrictEquals(tokens__[0].index, 0)

	assertStrictEquals(tokens__[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens__[1].buffer, " ")
	assertStrictEquals(tokens__[1].index, 1)

	assertStrictEquals(tokens__[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens__[2].buffer, "HEAD")
	assertStrictEquals(tokens__[2].index, 2)

	assertStrictEquals(tokens__[3].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens__[3].buffer, "\n")
	assertStrictEquals(tokens__[3].index, 6)

	assertStrictEquals(tokens__[4].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens__[4].buffer, "1")
	assertStrictEquals(tokens__[4].index, 10)

	assertStrictEquals(tokens__[5].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens__[5].buffer, " ")
	assertStrictEquals(tokens__[5].index, 11)

	assertStrictEquals(tokens__[6].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens__[6].buffer, "TEST")
	assertStrictEquals(tokens__[6].index, 12)

})

Deno.test("trimStart", () => {

	const tokens = Tokenizer.tokenize(" 0 HEAD ")

	assertStrictEquals(tokens.length, 3)

	assertStrictEquals(tokens[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[0].buffer, "0")
	assertStrictEquals(tokens[0].index, 1)

	assertStrictEquals(tokens[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[1].buffer, " ")
	assertStrictEquals(tokens[1].index, 2)

	assertStrictEquals(tokens[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[2].buffer, "HEAD")
	assertStrictEquals(tokens[2].index, 3)

	const tokens_ = Tokenizer.tokenize(`
		0 HEAD `)

	assertStrictEquals(tokens_.length, 3)

	assertStrictEquals(tokens_[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens_[0].buffer, "0")
	assertStrictEquals(tokens_[0].index, 3)

	assertStrictEquals(tokens_[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens_[1].buffer, " ")
	assertStrictEquals(tokens_[1].index, 4)

	assertStrictEquals(tokens_[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens_[2].buffer, "HEAD")
	assertStrictEquals(tokens_[2].index, 5)

	const tokens__ = Tokenizer.tokenize(`0 HEAD
		0 HEAD `)

	assertStrictEquals(tokens__.length, 7)

	assertStrictEquals(tokens__[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens__[0].buffer, "0")
	assertStrictEquals(tokens__[0].index, 0)

	assertStrictEquals(tokens__[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens__[1].buffer, " ")
	assertStrictEquals(tokens__[1].index, 1)

	assertStrictEquals(tokens__[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens__[2].buffer, "HEAD")
	assertStrictEquals(tokens__[2].index, 2)

	assertStrictEquals(tokens__[3].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens__[3].buffer, "\n")
	assertStrictEquals(tokens__[3].index, 6)

	assertStrictEquals(tokens__[4].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens__[4].buffer, "0")
	assertStrictEquals(tokens__[4].index, 9)

	assertStrictEquals(tokens__[5].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens__[5].buffer, " ")
	assertStrictEquals(tokens__[5].index, 10)

	assertStrictEquals(tokens__[6].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens__[6].buffer, "HEAD")
	assertStrictEquals(tokens__[6].index, 11)

const tokens___ = Tokenizer.tokenize(`0 HEAD
		0 HEAD
	1 TEST `)

	assertStrictEquals(tokens___.length, 11)

	assertStrictEquals(tokens___[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens___[0].buffer, "0")
	assertStrictEquals(tokens___[0].index, 0)

	assertStrictEquals(tokens___[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens___[1].buffer, " ")
	assertStrictEquals(tokens___[1].index, 1)

	assertStrictEquals(tokens___[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens___[2].buffer, "HEAD")
	assertStrictEquals(tokens___[2].index, 2)

	assertStrictEquals(tokens___[3].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens___[3].buffer, "\n")
	assertStrictEquals(tokens___[3].index, 6)

	assertStrictEquals(tokens___[4].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens___[4].buffer, "0")
	assertStrictEquals(tokens___[4].index, 9)

	assertStrictEquals(tokens___[5].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens___[5].buffer, " ")
	assertStrictEquals(tokens___[5].index, 10)

	assertStrictEquals(tokens___[6].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens___[6].buffer, "HEAD")
	assertStrictEquals(tokens___[6].index, 11)

	assertStrictEquals(tokens___[7].name, Token.NAME_LINE_FEED)
	assertStrictEquals(tokens___[7].buffer, "\n")
	assertStrictEquals(tokens___[7].index, 15)

	assertStrictEquals(tokens___[8].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens___[8].buffer, "1")
	assertStrictEquals(tokens___[8].index, 17)

	assertStrictEquals(tokens___[9].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens___[9].buffer, " ")
	assertStrictEquals(tokens___[9].index, 18)

	assertStrictEquals(tokens___[10].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens___[10].buffer, "TEST")
	assertStrictEquals(tokens___[10].index, 19)

})

Deno.test("separator", () => {

	const tokens = Tokenizer.tokenize(`032132       H `)

	assertStrictEquals(tokens.length, 3)

	assertStrictEquals(tokens[0].name, Token.NAME_LEVEL)
	assertStrictEquals(tokens[0].buffer, "032132")
	assertStrictEquals(tokens[0].index, 0)

	assertStrictEquals(tokens[1].name, Token.NAME_SEPARATOR)
	assertStrictEquals(tokens[1].buffer, " ")
	assertStrictEquals(tokens[1].index, 6)

	assertStrictEquals(tokens[2].name, Token.NAME_IDENTIFIER)
	assertStrictEquals(tokens[2].buffer, "H")
	assertStrictEquals(tokens[2].index, 13)

})
