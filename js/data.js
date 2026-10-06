// Bước 1: giữ nguyên 200 observations từ CSV Kaggle; không tạo cluster label.
export const customers = Object.freeze([
  {
    "id": 1,
    "gender": "Male",
    "age": 19,
    "income": 15,
    "spending": 39
  },
  {
    "id": 2,
    "gender": "Male",
    "age": 21,
    "income": 15,
    "spending": 81
  },
  {
    "id": 3,
    "gender": "Female",
    "age": 20,
    "income": 16,
    "spending": 6
  },
  {
    "id": 4,
    "gender": "Female",
    "age": 23,
    "income": 16,
    "spending": 77
  },
  {
    "id": 5,
    "gender": "Female",
    "age": 31,
    "income": 17,
    "spending": 40
  },
  {
    "id": 6,
    "gender": "Female",
    "age": 22,
    "income": 17,
    "spending": 76
  },
  {
    "id": 7,
    "gender": "Female",
    "age": 35,
    "income": 18,
    "spending": 6
  },
  {
    "id": 8,
    "gender": "Female",
    "age": 23,
    "income": 18,
    "spending": 94
  },
  {
    "id": 9,
    "gender": "Male",
    "age": 64,
    "income": 19,
    "spending": 3
  },
  {
    "id": 10,
    "gender": "Female",
    "age": 30,
    "income": 19,
    "spending": 72
  },
  {
    "id": 11,
    "gender": "Male",
    "age": 67,
    "income": 19,
    "spending": 14
  },
  {
    "id": 12,
    "gender": "Female",
    "age": 35,
    "income": 19,
    "spending": 99
  },
  {
    "id": 13,
    "gender": "Female",
    "age": 58,
    "income": 20,
    "spending": 15
  },
  {
    "id": 14,
    "gender": "Female",
    "age": 24,
    "income": 20,
    "spending": 77
  },
  {
    "id": 15,
    "gender": "Male",
    "age": 37,
    "income": 20,
    "spending": 13
  },
  {
    "id": 16,
    "gender": "Male",
    "age": 22,
    "income": 20,
    "spending": 79
  },
  {
    "id": 17,
    "gender": "Female",
    "age": 35,
    "income": 21,
    "spending": 35
  },
  {
    "id": 18,
    "gender": "Male",
    "age": 20,
    "income": 21,
    "spending": 66
  },
  {
    "id": 19,
    "gender": "Male",
    "age": 52,
    "income": 23,
    "spending": 29
  },
  {
    "id": 20,
    "gender": "Female",
    "age": 35,
    "income": 23,
    "spending": 98
  },
  {
    "id": 21,
    "gender": "Male",
    "age": 35,
    "income": 24,
    "spending": 35
  },
  {
    "id": 22,
    "gender": "Male",
    "age": 25,
    "income": 24,
    "spending": 73
  },
  {
    "id": 23,
    "gender": "Female",
    "age": 46,
    "income": 25,
    "spending": 5
  },
  {
    "id": 24,
    "gender": "Male",
    "age": 31,
    "income": 25,
    "spending": 73
  },
  {
    "id": 25,
    "gender": "Female",
    "age": 54,
    "income": 28,
    "spending": 14
  },
  {
    "id": 26,
    "gender": "Male",
    "age": 29,
    "income": 28,
    "spending": 82
  },
  {
    "id": 27,
    "gender": "Female",
    "age": 45,
    "income": 28,
    "spending": 32
  },
  {
    "id": 28,
    "gender": "Male",
    "age": 35,
    "income": 28,
    "spending": 61
  },
  {
    "id": 29,
    "gender": "Female",
    "age": 40,
    "income": 29,
    "spending": 31
  },
  {
    "id": 30,
    "gender": "Female",
    "age": 23,
    "income": 29,
    "spending": 87
  },
  {
    "id": 31,
    "gender": "Male",
    "age": 60,
    "income": 30,
    "spending": 4
  },
  {
    "id": 32,
    "gender": "Female",
    "age": 21,
    "income": 30,
    "spending": 73
  },
  {
    "id": 33,
    "gender": "Male",
    "age": 53,
    "income": 33,
    "spending": 4
  },
  {
    "id": 34,
    "gender": "Male",
    "age": 18,
    "income": 33,
    "spending": 92
  },
  {
    "id": 35,
    "gender": "Female",
    "age": 49,
    "income": 33,
    "spending": 14
  },
  {
    "id": 36,
    "gender": "Female",
    "age": 21,
    "income": 33,
    "spending": 81
  },
  {
    "id": 37,
    "gender": "Female",
    "age": 42,
    "income": 34,
    "spending": 17
  },
  {
    "id": 38,
    "gender": "Female",
    "age": 30,
    "income": 34,
    "spending": 73
  },
  {
    "id": 39,
    "gender": "Female",
    "age": 36,
    "income": 37,
    "spending": 26
  },
  {
    "id": 40,
    "gender": "Female",
    "age": 20,
    "income": 37,
    "spending": 75
  },
  {
    "id": 41,
    "gender": "Female",
    "age": 65,
    "income": 38,
    "spending": 35
  },
  {
    "id": 42,
    "gender": "Male",
    "age": 24,
    "income": 38,
    "spending": 92
  },
  {
    "id": 43,
    "gender": "Male",
    "age": 48,
    "income": 39,
    "spending": 36
  },
  {
    "id": 44,
    "gender": "Female",
    "age": 31,
    "income": 39,
    "spending": 61
  },
  {
    "id": 45,
    "gender": "Female",
    "age": 49,
    "income": 39,
    "spending": 28
  },
  {
    "id": 46,
    "gender": "Female",
    "age": 24,
    "income": 39,
    "spending": 65
  },
  {
    "id": 47,
    "gender": "Female",
    "age": 50,
    "income": 40,
    "spending": 55
  },
  {
    "id": 48,
    "gender": "Female",
    "age": 27,
    "income": 40,
    "spending": 47
  },
  {
    "id": 49,
    "gender": "Female",
    "age": 29,
    "income": 40,
    "spending": 42
  },
  {
    "id": 50,
    "gender": "Female",
    "age": 31,
    "income": 40,
    "spending": 42
  },
  {
    "id": 51,
    "gender": "Female",
    "age": 49,
    "income": 42,
    "spending": 52
  },
  {
    "id": 52,
    "gender": "Male",
    "age": 33,
    "income": 42,
    "spending": 60
  },
  {
    "id": 53,
    "gender": "Female",
    "age": 31,
    "income": 43,
    "spending": 54
  },
  {
    "id": 54,
    "gender": "Male",
    "age": 59,
    "income": 43,
    "spending": 60
  },
  {
    "id": 55,
    "gender": "Female",
    "age": 50,
    "income": 43,
    "spending": 45
  },
  {
    "id": 56,
    "gender": "Male",
    "age": 47,
    "income": 43,
    "spending": 41
  },
  {
    "id": 57,
    "gender": "Female",
    "age": 51,
    "income": 44,
    "spending": 50
  },
  {
    "id": 58,
    "gender": "Male",
    "age": 69,
    "income": 44,
    "spending": 46
  },
  {
    "id": 59,
    "gender": "Female",
    "age": 27,
    "income": 46,
    "spending": 51
  },
  {
    "id": 60,
    "gender": "Male",
    "age": 53,
    "income": 46,
    "spending": 46
  },
  {
    "id": 61,
    "gender": "Male",
    "age": 70,
    "income": 46,
    "spending": 56
  },
  {
    "id": 62,
    "gender": "Male",
    "age": 19,
    "income": 46,
    "spending": 55
  },
  {
    "id": 63,
    "gender": "Female",
    "age": 67,
    "income": 47,
    "spending": 52
  },
  {
    "id": 64,
    "gender": "Female",
    "age": 54,
    "income": 47,
    "spending": 59
  },
  {
    "id": 65,
    "gender": "Male",
    "age": 63,
    "income": 48,
    "spending": 51
  },
  {
    "id": 66,
    "gender": "Male",
    "age": 18,
    "income": 48,
    "spending": 59
  },
  {
    "id": 67,
    "gender": "Female",
    "age": 43,
    "income": 48,
    "spending": 50
  },
  {
    "id": 68,
    "gender": "Female",
    "age": 68,
    "income": 48,
    "spending": 48
  },
  {
    "id": 69,
    "gender": "Male",
    "age": 19,
    "income": 48,
    "spending": 59
  },
  {
    "id": 70,
    "gender": "Female",
    "age": 32,
    "income": 48,
    "spending": 47
  },
  {
    "id": 71,
    "gender": "Male",
    "age": 70,
    "income": 49,
    "spending": 55
  },
  {
    "id": 72,
    "gender": "Female",
    "age": 47,
    "income": 49,
    "spending": 42
  },
  {
    "id": 73,
    "gender": "Female",
    "age": 60,
    "income": 50,
    "spending": 49
  },
  {
    "id": 74,
    "gender": "Female",
    "age": 60,
    "income": 50,
    "spending": 56
  },
  {
    "id": 75,
    "gender": "Male",
    "age": 59,
    "income": 54,
    "spending": 47
  },
  {
    "id": 76,
    "gender": "Male",
    "age": 26,
    "income": 54,
    "spending": 54
  },
  {
    "id": 77,
    "gender": "Female",
    "age": 45,
    "income": 54,
    "spending": 53
  },
  {
    "id": 78,
    "gender": "Male",
    "age": 40,
    "income": 54,
    "spending": 48
  },
  {
    "id": 79,
    "gender": "Female",
    "age": 23,
    "income": 54,
    "spending": 52
  },
  {
    "id": 80,
    "gender": "Female",
    "age": 49,
    "income": 54,
    "spending": 42
  },
  {
    "id": 81,
    "gender": "Male",
    "age": 57,
    "income": 54,
    "spending": 51
  },
  {
    "id": 82,
    "gender": "Male",
    "age": 38,
    "income": 54,
    "spending": 55
  },
  {
    "id": 83,
    "gender": "Male",
    "age": 67,
    "income": 54,
    "spending": 41
  },
  {
    "id": 84,
    "gender": "Female",
    "age": 46,
    "income": 54,
    "spending": 44
  },
  {
    "id": 85,
    "gender": "Female",
    "age": 21,
    "income": 54,
    "spending": 57
  },
  {
    "id": 86,
    "gender": "Male",
    "age": 48,
    "income": 54,
    "spending": 46
  },
  {
    "id": 87,
    "gender": "Female",
    "age": 55,
    "income": 57,
    "spending": 58
  },
  {
    "id": 88,
    "gender": "Female",
    "age": 22,
    "income": 57,
    "spending": 55
  },
  {
    "id": 89,
    "gender": "Female",
    "age": 34,
    "income": 58,
    "spending": 60
  },
  {
    "id": 90,
    "gender": "Female",
    "age": 50,
    "income": 58,
    "spending": 46
  },
  {
    "id": 91,
    "gender": "Female",
    "age": 68,
    "income": 59,
    "spending": 55
  },
  {
    "id": 92,
    "gender": "Male",
    "age": 18,
    "income": 59,
    "spending": 41
  },
  {
    "id": 93,
    "gender": "Male",
    "age": 48,
    "income": 60,
    "spending": 49
  },
  {
    "id": 94,
    "gender": "Female",
    "age": 40,
    "income": 60,
    "spending": 40
  },
  {
    "id": 95,
    "gender": "Female",
    "age": 32,
    "income": 60,
    "spending": 42
  },
  {
    "id": 96,
    "gender": "Male",
    "age": 24,
    "income": 60,
    "spending": 52
  },
  {
    "id": 97,
    "gender": "Female",
    "age": 47,
    "income": 60,
    "spending": 47
  },
  {
    "id": 98,
    "gender": "Female",
    "age": 27,
    "income": 60,
    "spending": 50
  },
  {
    "id": 99,
    "gender": "Male",
    "age": 48,
    "income": 61,
    "spending": 42
  },
  {
    "id": 100,
    "gender": "Male",
    "age": 20,
    "income": 61,
    "spending": 49
  },
  {
    "id": 101,
    "gender": "Female",
    "age": 23,
    "income": 62,
    "spending": 41
  },
  {
    "id": 102,
    "gender": "Female",
    "age": 49,
    "income": 62,
    "spending": 48
  },
  {
    "id": 103,
    "gender": "Male",
    "age": 67,
    "income": 62,
    "spending": 59
  },
  {
    "id": 104,
    "gender": "Male",
    "age": 26,
    "income": 62,
    "spending": 55
  },
  {
    "id": 105,
    "gender": "Male",
    "age": 49,
    "income": 62,
    "spending": 56
  },
  {
    "id": 106,
    "gender": "Female",
    "age": 21,
    "income": 62,
    "spending": 42
  },
  {
    "id": 107,
    "gender": "Female",
    "age": 66,
    "income": 63,
    "spending": 50
  },
  {
    "id": 108,
    "gender": "Male",
    "age": 54,
    "income": 63,
    "spending": 46
  },
  {
    "id": 109,
    "gender": "Male",
    "age": 68,
    "income": 63,
    "spending": 43
  },
  {
    "id": 110,
    "gender": "Male",
    "age": 66,
    "income": 63,
    "spending": 48
  },
  {
    "id": 111,
    "gender": "Male",
    "age": 65,
    "income": 63,
    "spending": 52
  },
  {
    "id": 112,
    "gender": "Female",
    "age": 19,
    "income": 63,
    "spending": 54
  },
  {
    "id": 113,
    "gender": "Female",
    "age": 38,
    "income": 64,
    "spending": 42
  },
  {
    "id": 114,
    "gender": "Male",
    "age": 19,
    "income": 64,
    "spending": 46
  },
  {
    "id": 115,
    "gender": "Female",
    "age": 18,
    "income": 65,
    "spending": 48
  },
  {
    "id": 116,
    "gender": "Female",
    "age": 19,
    "income": 65,
    "spending": 50
  },
  {
    "id": 117,
    "gender": "Female",
    "age": 63,
    "income": 65,
    "spending": 43
  },
  {
    "id": 118,
    "gender": "Female",
    "age": 49,
    "income": 65,
    "spending": 59
  },
  {
    "id": 119,
    "gender": "Female",
    "age": 51,
    "income": 67,
    "spending": 43
  },
  {
    "id": 120,
    "gender": "Female",
    "age": 50,
    "income": 67,
    "spending": 57
  },
  {
    "id": 121,
    "gender": "Male",
    "age": 27,
    "income": 67,
    "spending": 56
  },
  {
    "id": 122,
    "gender": "Female",
    "age": 38,
    "income": 67,
    "spending": 40
  },
  {
    "id": 123,
    "gender": "Female",
    "age": 40,
    "income": 69,
    "spending": 58
  },
  {
    "id": 124,
    "gender": "Male",
    "age": 39,
    "income": 69,
    "spending": 91
  },
  {
    "id": 125,
    "gender": "Female",
    "age": 23,
    "income": 70,
    "spending": 29
  },
  {
    "id": 126,
    "gender": "Female",
    "age": 31,
    "income": 70,
    "spending": 77
  },
  {
    "id": 127,
    "gender": "Male",
    "age": 43,
    "income": 71,
    "spending": 35
  },
  {
    "id": 128,
    "gender": "Male",
    "age": 40,
    "income": 71,
    "spending": 95
  },
  {
    "id": 129,
    "gender": "Male",
    "age": 59,
    "income": 71,
    "spending": 11
  },
  {
    "id": 130,
    "gender": "Male",
    "age": 38,
    "income": 71,
    "spending": 75
  },
  {
    "id": 131,
    "gender": "Male",
    "age": 47,
    "income": 71,
    "spending": 9
  },
  {
    "id": 132,
    "gender": "Male",
    "age": 39,
    "income": 71,
    "spending": 75
  },
  {
    "id": 133,
    "gender": "Female",
    "age": 25,
    "income": 72,
    "spending": 34
  },
  {
    "id": 134,
    "gender": "Female",
    "age": 31,
    "income": 72,
    "spending": 71
  },
  {
    "id": 135,
    "gender": "Male",
    "age": 20,
    "income": 73,
    "spending": 5
  },
  {
    "id": 136,
    "gender": "Female",
    "age": 29,
    "income": 73,
    "spending": 88
  },
  {
    "id": 137,
    "gender": "Female",
    "age": 44,
    "income": 73,
    "spending": 7
  },
  {
    "id": 138,
    "gender": "Male",
    "age": 32,
    "income": 73,
    "spending": 73
  },
  {
    "id": 139,
    "gender": "Male",
    "age": 19,
    "income": 74,
    "spending": 10
  },
  {
    "id": 140,
    "gender": "Female",
    "age": 35,
    "income": 74,
    "spending": 72
  },
  {
    "id": 141,
    "gender": "Female",
    "age": 57,
    "income": 75,
    "spending": 5
  },
  {
    "id": 142,
    "gender": "Male",
    "age": 32,
    "income": 75,
    "spending": 93
  },
  {
    "id": 143,
    "gender": "Female",
    "age": 28,
    "income": 76,
    "spending": 40
  },
  {
    "id": 144,
    "gender": "Female",
    "age": 32,
    "income": 76,
    "spending": 87
  },
  {
    "id": 145,
    "gender": "Male",
    "age": 25,
    "income": 77,
    "spending": 12
  },
  {
    "id": 146,
    "gender": "Male",
    "age": 28,
    "income": 77,
    "spending": 97
  },
  {
    "id": 147,
    "gender": "Male",
    "age": 48,
    "income": 77,
    "spending": 36
  },
  {
    "id": 148,
    "gender": "Female",
    "age": 32,
    "income": 77,
    "spending": 74
  },
  {
    "id": 149,
    "gender": "Female",
    "age": 34,
    "income": 78,
    "spending": 22
  },
  {
    "id": 150,
    "gender": "Male",
    "age": 34,
    "income": 78,
    "spending": 90
  },
  {
    "id": 151,
    "gender": "Male",
    "age": 43,
    "income": 78,
    "spending": 17
  },
  {
    "id": 152,
    "gender": "Male",
    "age": 39,
    "income": 78,
    "spending": 88
  },
  {
    "id": 153,
    "gender": "Female",
    "age": 44,
    "income": 78,
    "spending": 20
  },
  {
    "id": 154,
    "gender": "Female",
    "age": 38,
    "income": 78,
    "spending": 76
  },
  {
    "id": 155,
    "gender": "Female",
    "age": 47,
    "income": 78,
    "spending": 16
  },
  {
    "id": 156,
    "gender": "Female",
    "age": 27,
    "income": 78,
    "spending": 89
  },
  {
    "id": 157,
    "gender": "Male",
    "age": 37,
    "income": 78,
    "spending": 1
  },
  {
    "id": 158,
    "gender": "Female",
    "age": 30,
    "income": 78,
    "spending": 78
  },
  {
    "id": 159,
    "gender": "Male",
    "age": 34,
    "income": 78,
    "spending": 1
  },
  {
    "id": 160,
    "gender": "Female",
    "age": 30,
    "income": 78,
    "spending": 73
  },
  {
    "id": 161,
    "gender": "Female",
    "age": 56,
    "income": 79,
    "spending": 35
  },
  {
    "id": 162,
    "gender": "Female",
    "age": 29,
    "income": 79,
    "spending": 83
  },
  {
    "id": 163,
    "gender": "Male",
    "age": 19,
    "income": 81,
    "spending": 5
  },
  {
    "id": 164,
    "gender": "Female",
    "age": 31,
    "income": 81,
    "spending": 93
  },
  {
    "id": 165,
    "gender": "Male",
    "age": 50,
    "income": 85,
    "spending": 26
  },
  {
    "id": 166,
    "gender": "Female",
    "age": 36,
    "income": 85,
    "spending": 75
  },
  {
    "id": 167,
    "gender": "Male",
    "age": 42,
    "income": 86,
    "spending": 20
  },
  {
    "id": 168,
    "gender": "Female",
    "age": 33,
    "income": 86,
    "spending": 95
  },
  {
    "id": 169,
    "gender": "Female",
    "age": 36,
    "income": 87,
    "spending": 27
  },
  {
    "id": 170,
    "gender": "Male",
    "age": 32,
    "income": 87,
    "spending": 63
  },
  {
    "id": 171,
    "gender": "Male",
    "age": 40,
    "income": 87,
    "spending": 13
  },
  {
    "id": 172,
    "gender": "Male",
    "age": 28,
    "income": 87,
    "spending": 75
  },
  {
    "id": 173,
    "gender": "Male",
    "age": 36,
    "income": 87,
    "spending": 10
  },
  {
    "id": 174,
    "gender": "Male",
    "age": 36,
    "income": 87,
    "spending": 92
  },
  {
    "id": 175,
    "gender": "Female",
    "age": 52,
    "income": 88,
    "spending": 13
  },
  {
    "id": 176,
    "gender": "Female",
    "age": 30,
    "income": 88,
    "spending": 86
  },
  {
    "id": 177,
    "gender": "Male",
    "age": 58,
    "income": 88,
    "spending": 15
  },
  {
    "id": 178,
    "gender": "Male",
    "age": 27,
    "income": 88,
    "spending": 69
  },
  {
    "id": 179,
    "gender": "Male",
    "age": 59,
    "income": 93,
    "spending": 14
  },
  {
    "id": 180,
    "gender": "Male",
    "age": 35,
    "income": 93,
    "spending": 90
  },
  {
    "id": 181,
    "gender": "Female",
    "age": 37,
    "income": 97,
    "spending": 32
  },
  {
    "id": 182,
    "gender": "Female",
    "age": 32,
    "income": 97,
    "spending": 86
  },
  {
    "id": 183,
    "gender": "Male",
    "age": 46,
    "income": 98,
    "spending": 15
  },
  {
    "id": 184,
    "gender": "Female",
    "age": 29,
    "income": 98,
    "spending": 88
  },
  {
    "id": 185,
    "gender": "Female",
    "age": 41,
    "income": 99,
    "spending": 39
  },
  {
    "id": 186,
    "gender": "Male",
    "age": 30,
    "income": 99,
    "spending": 97
  },
  {
    "id": 187,
    "gender": "Female",
    "age": 54,
    "income": 101,
    "spending": 24
  },
  {
    "id": 188,
    "gender": "Male",
    "age": 28,
    "income": 101,
    "spending": 68
  },
  {
    "id": 189,
    "gender": "Female",
    "age": 41,
    "income": 103,
    "spending": 17
  },
  {
    "id": 190,
    "gender": "Female",
    "age": 36,
    "income": 103,
    "spending": 85
  },
  {
    "id": 191,
    "gender": "Female",
    "age": 34,
    "income": 103,
    "spending": 23
  },
  {
    "id": 192,
    "gender": "Female",
    "age": 32,
    "income": 103,
    "spending": 69
  },
  {
    "id": 193,
    "gender": "Male",
    "age": 33,
    "income": 113,
    "spending": 8
  },
  {
    "id": 194,
    "gender": "Female",
    "age": 38,
    "income": 113,
    "spending": 91
  },
  {
    "id": 195,
    "gender": "Female",
    "age": 47,
    "income": 120,
    "spending": 16
  },
  {
    "id": 196,
    "gender": "Female",
    "age": 35,
    "income": 120,
    "spending": 79
  },
  {
    "id": 197,
    "gender": "Female",
    "age": 45,
    "income": 126,
    "spending": 28
  },
  {
    "id": 198,
    "gender": "Male",
    "age": 32,
    "income": 126,
    "spending": 74
  },
  {
    "id": 199,
    "gender": "Male",
    "age": 32,
    "income": 137,
    "spending": 18
  },
  {
    "id": 200,
    "gender": "Male",
    "age": 30,
    "income": 137,
    "spending": 83
  }
].map(Object.freeze));
export const features = {age: "Age", income: "Annual Income (k$)", spending: "Spending Score (1–100)"};
